from flask import Blueprint, render_template, redirect
users = Blueprint("users", __name__, url_prefix="/users")


@users.route("/<int:uid>")
def user():
    """Get a user's information by id."""
    pass
  
  
@users.route("/<int:uid>/programs")
def user_programs():
    """Get a user's subscribed programs."""
    pass


@users.route("/", methods=["POST"])
def create_user():
    """Validate signup data and create a new user account."""
    pass


@users.route("/<int:uid>", methods=["PATCH"])
def edit_user():
    """Validate edit-submissions and update a user's information."""
    pass
  

@users.route("/<int:uid>", methods=["DELETE"])
def delete_user():
    """Delete a user account and all its dependencies."""
    pass
  
  
@users.route("/<int:uid>/redeemed")
def user_redeemed_rewards():
    """Get a user's redeemed list of rewards."""
    

@users.route("/<int:uid>/redeemed/:type")
def user_redeemed_type_rewards():
    """Get a user's redeemed list of rewards of a certain type."""
    pass


@users.route("/<int:uid>/programs/<int:pid>/redeemed")
def user_redeemed_program_rewards():
    """Get a user's redeemed list of rewards from a certain program."""
    pass
  

@users.route("/<int:uid>/bonds")
def bonds():
    """Get a user's list of bonds with other users."""
    pass
  

@users.route("/<int:uid>/bonds", methods=["POST"])
def create_bond(id):
    """Create a 'bond' with another user."""
    pass


@users.route("/<int:uid>/bonds/<int:bid>", methods=["DELETE"])
def delete_bond()
    """Delete a bond with another user."""
    pass
