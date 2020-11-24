from flask import Blueprint, jsonify
from app.models import db, User, Stamp
from app.schemas import user_schema
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_user, logout_user, login_required

user_routes = Blueprint('users', __name__)


@user_routes.route('/list')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/')
@login_required
def user():
    """Get a user's information by id."""
    user = User.query.filter(User.id == current_user.id).options(joinedload(User.stamp)).one()
    user_data = user_schema.dump(user)
    user_data["stamp"] = user.stamp.to_dict()
    print(user_data, "--------------------HEREE--------------")
    del user_data["hashed_password"]
    return jsonify(user_data)

# TODO: Prune unnecessary info and eager-load necessary info
# TODO What info is unneeded?
# TESTED Functions
@user_routes.route("/<int:uid>")
def user_details(uid):
    """Get a user's information by id."""
    user = User.query.filter(User.id == uid).one()
    user_data = user_schema.dump(user)
    del user_data["hashed_password"]

    return jsonify(user_data)
