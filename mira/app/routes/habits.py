from flask import Blueprint, render_template, redirect

habits = Blueprint("habits", __name__, url_prefix="/habits")


@habits.route("/programs/<int:pid>")
def program_habits():
    """Get a list of a program's habits."""
    pass
  

@habits.route("/<int:hid>")
def habit():
    """Get a habit's details, including recent histories for all members."""
    pass



@habits.route("/programs/<int:pid>", methods=["POST"])
def create_habit():
    """Create a new habit for a program."""
    pass


@habits.route("/<int:hid>", methods=["PATCH"])
def edit_habit():
    """Edit a habit's details by id."""


@habits.route("/<int:hid>", methods=["DELETE"])
def delete_habit():
    """Delete a habit by id."""


# STAMPING HABITS
@habits.route("/<int:hid>/members/<int:uid>", method=["POST"])
def stamp_():
    """Change the status of a daily_stamp to 'stamped' or 'pending'."""
    pass
  

@habits.route("/<int:hid>/members/<int:uid>", method=["DELETE"])
def unstamp():
    """Change the status of a daily_stamp to 'unstamped'."""
    pass
