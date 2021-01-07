from flask import Blueprint, jsonify, session, request, make_response
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_user, logout_user, login_required
from http import cookies
from app.models import db, User, Program, Membership
from app.forms import LoginForm, SignUpForm
from app.schemas import user_schema, membership_schema
from app.utils import dump_data_list, queryUserFullData, validation_errors_to_error_messages
from pprint import pprint

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """Authenticates a user"""
    if current_user.is_authenticated:
        # user_data = queryUserFullData(current_user.id)
        # print("\nUSER WITH MEMBERS")
        # pprint(user_data)
        return queryUserFullData(current_user.id)
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """Logs a user in"""
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        # res.set_cookie('uid_cookie', str(user.id))
        return queryUserFullData(user.id)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """Logs a user out"""
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """Creates a new user and logs them in"""
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        # Create user, default program, and default membership records
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            birthday=form.data['birthday']
        )
        program = Program(program=f"{form.data['username']}'s Habits",
                          creator=user,)
        membership = Membership(program=program,
                            member=user,
                            stamper=user,)
        db.session.add(user)
        db.session.add(program)
        db.session.add(membership)
        db.session.commit()

        login_user(user)

        # Set cookie
        # res = make_response(jsonify(user_schema.dump(user)))
        # res.set_cookie("uid_cookie", str(user.id))

        return queryUserFullData(user.id)
    return {'errors': validation_errors_to_error_messages(form.errors)}


@auth_routes.route('/unauthorized')
def unauthorized():
    """Returns unauthorized JSON when flask-login authentication fails"""
    return {'errors': ['Unauthorized']}, 401
