from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User, Stamp
from app.schemas import user_schema
from sqlalchemy.orm import joinedload

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """Get a user's information by id."""
    user = User.query.filter(User.id == id).options(joinedload(User.stamp)).one()
    print(user.stamp)
    user_data = user_schema.dump(user)
    user_data["stamp"] = user.stamp.to_dict()
    # del user_data["hashword"]
    return jsonify(user_data)



    # user = User.query.options(db.joinedload("stamp")).get(id)
    # print(user.to_dict(), "<--------------- HERE")
    # return user.to_dict()
