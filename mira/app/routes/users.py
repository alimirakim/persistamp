from flask import Blueprint, render_template, redirect, jsonify
from app.models import db, User, Program, Member, Reward
from app.schemas import user_schema, program_schema, reward_schema
users = Blueprint("users", __name__, url_prefix="/users")

# TODO: Prune unnecessary info and eager-load necessary info

# TODO What info is unneeded?
@users.route("/<int:uid>")
def user_details(uid):
    """Get a user's information by id."""
    user = User.query.filter(User.id == uid).one()
    user_data = user_schema.dump(user)
    del user_data["hashword"]
    return jsonify(user_data)


# TODO How to filter by whether the program includes the member?
@users.route("/<int:uid>/programs")
def user_programs(uid):
    """Get a user's subscribed programs."""
    user_programs = Program.query.all()
    user_programs_data = []
    for program in user_programs:
        user_programs_data.append(program_schema.dump(program))
    return jsonify(user_programs_data)


@users.route("/", methods=["POST"])
def create_user():
    """Validate signup data and create a new user account."""
    # TODO Add validation. Catch and extract form data. 
    user = User(
      username=username,
      first_name=first_name,
      last_name=last_name,
      birthday=birthday, # convert into datetime object?
      color_id=color_id, # if none, use default
      stamp_id=stamp_id,
      email=email,
      hashword=password, # hash this.
    )
    db.session.add(user)
    db.commit()
    user_data = user_schema.dump(user)
    del user_data["hashword"]
    return jsonify(user_data)


@users.route("/<int:uid>", methods=["PATCH"])
def edit_user(uid):
    """Validate edit-submissions and update a user's information."""
    user = User.query.filter(User.id == uid).one()
    # TODO Extract edit data and commit. ex. user.username = username
    # user.username = 
    # user.first_name = 
    # user.last_name = 
    # user.birthday = 
    # user.color_id = 
    # user.stamp_id = 
    # user.email = 
    # user.hashword = 
    db.session.commit()
    user_data = user_schema.dump(user)
    del user_data["hashword"]
    return jsonify(user_data)
  

# TODO Do we need a cascade-delete?
@users.route("/<int:uid>", methods=["DELETE"])
def delete_user(uid):
    """Delete a user account and all its dependencies."""
    user = User.query.filter(User.id == uid).one()
    db.session.delete(user)
    return "User successfully deleted"
  
  
# TODO How to filter by whether they were redeemed by user?
@users.route("/<int:uid>/redeemed/<string:type>")
def user_redeemed(uid, type):
    """Get a user's redeemed list of rewards, by type if specified."""
    # redeemed_rewards = Reward.query.filter().all()
    redeemed_rewards = []
    for reward in redeemed_rewards:
        redeemed_rewards.append(reward_schema.dump(reward))
    return jsonify(redeemed_rewards)



@users.route("/<int:uid>/programs/<int:pid>/redeemed")
def user_redeemed_program_rewards(uid, pid):
    """Get a user's redeemed list of rewards from a certain program."""
    program_redeemed_rewards = Reward.query.filter(Reward.program_id == pid).all()
    redeemed_rewards = []
    for redeemed in program_redeemed_rewards:
        program_redeemed_rewards.append(reward_schema.dump(rewards))
    return jsonify(redeemed_rewards)
    

@users.route("/<int:uid>/bonds")
def user_bonds(uid):
    """Get a user's list of bonds with other users."""
    pass


@users.route("/<int:uid>/bonds", methods=["POST"])
def create_bond(uidid):
    """Create a 'bond' with another user."""
    pass


@users.route("/<int:uid>/bonds/<int:bid>", methods=["DELETE"])
def delete_bond(uid, bid):
    """Delete a bond with another user."""
    pass
