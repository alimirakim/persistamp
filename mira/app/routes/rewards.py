from flask import Blueprint, redirect, render_template

rewards = Blueprint("rewards", __name__, url_prefix="/rewards")


@rewards.route("/<str:type>")
def rewards(type=""):
    """Get a list of all default-universal rewards, by type if specified."""
    pass
  

@rewards.route("/programs/<int:pid>", methods=["POST"])
def create_reward():
    """Create a custom reward for a program."""
    pass


@rewards.route("/<int:rid>", methods=["PATCH"])
def edit_reward()
    """Edit a reward by id."""
    pass


@rewards.route("/<int:rid>", methods=["DELETE"])
def delete_reward():
    """Delete a reward by id."""
    pass


@rewards.route("/<int:rid>/redeem/members/<int:uid>")
def redeem():
    """Redeem a reward for a member."""
    pass
