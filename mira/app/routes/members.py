from flask import Blueprint, render_template, redirect

members = Blueprint("members", __name__, url_prefix="/members")

# PROGRAM MEMBERS
@programs.route("/programs/<int:pid>/all")
def program_members():
    """Get a list of a program's members."""
    pass


@programs.route("/<int:uid>")
def program_member():
    """Get a member's details by id."""
    pass


@programs.route("/programs/<int:pid>/add", methods=["POST"])
def add_member():
    """Add a user as a member to a program."""
    pass


@programs.route("/<int:uid>", methods=["DELETE"])
def remove_member():
    """Delete a member from a program."""
    pass


@programs.route("/<int:uid>/habits")
def member_habits():
    """Get a list of a program member's habits (program-specific)."""
    pass


@programs.route("/<int:uid>/habits/<int:hid>")
def member_habit():
    """Get the full details and history of a habit for a member."""
    pass


@programs.route("/<int:uid>/stamper")
def member_stamper():
    """Get the stamper for a member in a program."""
    pass


@programs.route("/<int:uid>/stamper", methods=["PATCH"])
def change_stamper():
    """Change a member's stamper."""
    pass


@programs.route("/<int:uid>/stamper")
def remove_stamper():
    """Unassign a stamper from a member."""
    pass
