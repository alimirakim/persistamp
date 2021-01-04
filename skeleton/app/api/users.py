# from flask import Blueprint, render_template, redirect, jsonify, request
# from app.models import db, User, Program, Member, Reward, Redeemed, Bond, Stamp
# from app.schemas import user_schema, program_schema, reward_schema, bond_schema
# from app.utils import dump_data_list

# users = Blueprint("users", __name__, url_prefix="/users")


# # TODO: Prune unnecessary info and eager-load necessary info
# # TODO What info is unneeded?
# # TESTED Functions
# # @users.route("/<int:uid>")
# # def user_details(uid):
# #     """Get a user's information by id."""
# #     user = User.query.filter(User.id == uid)
# #     user_data = user_schema.dump(user)
# #     del user_data["hashword"]
# #     return jsonify(user_data)


# # TODO How to filter by whether the program includes the member?
# # TESTED Functions for grabbing 'all' no filter
# @users.route("/<int:uid>/programs")
# def user_programs(uid):
#     """Get a user's subscribed programs."""
#     user_programs = Program.query.all()
#     return jsonify(dump_data_list(user_programs, program_schema))


# # TESTED Functions.
# @users.route("/", methods=["POST"])
# def create_user():
#     """Validate signup data and create a new user account."""
#     data = request.json
#     # TODO Add validation. Catch and extract form data.
#     user = User(
#       username=data["username"],
#       first_name=data["first_name"],
#       last_name=data["last_name"],
#       birthday=data["birthday"],
#       email=data["email"],
#       hashword=data["password"], # hash this.
#     )

#     if "color" in data.keys():
#         user.color = data["color"]
#     if "stamp_id" in data.keys():
#         user.stamp_id = data["stamp_id"]

#     db.session.add(user)
#     db.session.commit()
#     user_data = user_schema.dump(user)
#     del user_data["hashword"]
#     return jsonify(user_data)


# # TESTED Functions, but code is ugly AF
# @users.route("/<int:uid>", methods=["PATCH"])
# def edit_user(uid):
#     """Validate edit-submissions and update a user's information."""
#     data = request.json
#     user = User.query.filter(User.id == uid).one()
#     # columns = User.__table__.columns.keys()
#     # TODO How the fuck do I make this pretty??
#     if "username" in data.keys():
#         user.username = data["username"]
#     if "first_name" in data.keys():
#         user.first_name = data["first_name"]
#     if "last_name" in data.keys():
#         user.last_name = data["last_name"]
#     if "birthday" in data.keys():
#         user.birthday = data["birthday"]
#     if "color" in data.keys():
#         user.color = data["color"]
#     if "stamp_id" in data.keys():
#         user.stamp_id = data["stamp_id"]
#     if "email" in data.keys():
#         user.email = data["email"]
#     if "password" in data.keys():
#         user.hashword = data["password"] # TODO Must be hashed
#     db.session.commit()
#     user_data = user_schema.dump(user)
#     del user_data["hashword"]
#     return jsonify(user_data)


# # TODO Do we need a cascade-delete?
# # TESTED Functions, at least with a user with no dependencies
# @users.route("/<int:uid>", methods=["DELETE"])
# def delete_user(uid):
#     """Delete a user account and all its dependencies."""
#     user = User.query.filter(User.id == uid).one()
#     db.session.delete(user)
#     db.session.commit()
#     return "User successfully deleted"


# # TODO How to filter by whether they were redeemed by user?
# # TESTED Don't have seeder data for Redeemed rewards yet, but it returned empty list?
# @users.route("/<int:uid>/redeemed")
# def user_redeemed(uid):
#     """Get a user's redeemed list of rewards, by type if specified."""
#     redeemed_rewards = Redeemed.query.filter(Redeemed.user_id == uid).all()
#     return jsonify(dump_data_list(redeemed_rewards, reward_schema))


# # TESTED Hot mess. Can't specify by program. For now, the uncommented version at
# # least returns a list.
# @users.route("/<int:uid>/programs/<int:pid>/redeemed")
# def user_redeemed_program_rewards(uid, pid):
#     """Get a user's redeemed list of rewards from a certain program."""
#     print("\nREDEEEMED?", dir(Redeemed))
#     print(dir(Redeemed.reward))
#     program_redeemed = Redeemed.query.filter(Redeemed.user_id == uid).all()
#     # program_redeemed = Redeemed.query.filter(db.and_(Redeemed.user_id == uid, Redeemed.reward.program_id == pid)).all()
#     # program_redeemed = Reward.query.filter(Reward.program_id == pid).all()
#     return jsonify(dump_data_list(program_redeemed, reward_schema))


# # TESTED Seems to function, returns empty list for now, must add seeders
# @users.route("/<int:uid>/bonds")
# def user_bonds(uid):
#     """Get a user's list of bonds with other users."""
#     bonds = Bond.query.filter(Bond.user1_id == uid).all()
#     return jsonify(dump_data_list(bonds, bond_schema))


# # NOTE May prefer JSON instead of params?
# # TESTED Functions, adds a bond.
# @users.route("/<int:uid>/bonds/users/<int:uid2>", methods=["POST"])
# def create_bond(uid, uid2):
#     """Create a 'bond' with another user."""
#     bond = Bond(user1_id=uid,
#                 user2_id=uid2)
#     db.session.add(bond)
#     db.session.commit()
#     return jsonify(bond_schema.dump(bond))


# # TESTED Functions. But should try user-id instead of bid maybe?
# @users.route("/<int:uid>/bonds/<int:bid>", methods=["DELETE"])
# def delete_bond(uid, bid):
#     """Delete a bond with another user."""
#     bond = Bond.query.filter(Bond.id == bid).one()
#     db.session.delete(bond)
#     db.session.commit()
#     return "The bond has been broken..."
