from flask import Blueprint, jsonify, session, request, make_response
from app.models import db, User, Program, Member
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from http import cookies
from app.schemas import user_schema

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
    if current_user.is_authenticated:
        return jsonify(user_schema.dump(current_user))
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
        res.set_cookie('uid_cookie', str(user.id))
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
