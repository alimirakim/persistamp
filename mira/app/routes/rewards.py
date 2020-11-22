from flask import Blueprint, render_template, redirect

rewards = Blueprint("rewards", __name__, url_prefix="/rewards")


@rewards.route("/<string:type>")
def type_rewards(type):
    """Get a list of all default-universal rewards, by type if specified."""
    pass


@rewards.route("/programs/<int:pid>", methods=["POST"])
def create_reward(pid):
    """Create a custom reward for a program."""
    pass


@rewards.route("/<int:rid>", methods=["PATCH"])
def edit_reward(rid):
    """Edit a reward by id."""
    pass


@rewards.route("/<int:rid>", methods=["DELETE"])
def delete_reward(rid):
    """Delete a reward by id."""
    pass


@rewards.route("/<int:rid>/redeem/members/<int:uid>")
def redeem_reward(rid, uid):
    """Redeem a reward for a member."""
    pass
