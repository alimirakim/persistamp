from flask import Blueprint, jsonify, session, request, make_response
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_user, logout_user, login_required
from http import cookies
from app.models import db, User, Program, Member
from app.forms import LoginForm, SignUpForm
from app.schemas import user_schema, color_schema, stamp_schema, member_schema
from app.utils import dump_data_list
from pprint import pprint

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """Authenticates a user"""
    user = User.query.options( \
      joinedload(User.color), \
      joinedload(User.stamp), \
      joinedload(User.memberships), \
      ).get(current_user.id)
    if user.is_authenticated:
        
        user_data = user_schema.dump(current_user)
        user_data["color"] = color_schema.dump(user.color)
        user_data["stamp"] = stamp_schema.dump(user.stamp)
        print("\nauthed user")
        user_data["memberships"] = {m["id"]:m for m in dump_data_list(user.memberships, member_schema)}
        print("\nUSER WITH MEMBERS")
        # pprint(user_data)
        return jsonify(user_data)
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
        print(user.id, "---------------------------HEEEEREE--------------------")
        res = make_response(user.to_dict())
        # res.set_cookie('uid_cookie', str(user.id))
        return res

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """Logs a user out"""
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """Creates a new user and logs them in"""
    # print("REQUEST FORM: ", request.form.get("username"))
    # print("DIR REQUEST:  ", dir(request.form))
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
        membership = Member(program=program,
                            member=user,
                            stamper=user,)
        db.session.add(user)
        db.session.add(program)
        db.session.add(membership)
        db.session.commit()

        login_user(user)

        # Set cookie
        res = make_response(jsonify(user_schema.dump(user)))
        res.set_cookie("uid_cookie", str(user.id))

        return res
    return {'errors': validation_errors_to_error_messages(form.errors)}


@auth_routes.route('/unauthorized')
def unauthorized():
    """Returns unauthorized JSON when flask-login authentication fails"""
    return {'errors': ['Unauthorized']}, 401
