from flask import Blueprint, render_template, redirect

members = Blueprint("members", __name__, url_prefix="/members")

# PROGRAM MEMBERS
@members.route("/programs/<int:pid>/all")
def program_members(pid):
    """Get a list of a program's members."""
    pass


@members.route("/<int:uid>")
def program_member(uid):
    """Get a member's details by id."""
    pass


@members.route("/programs/<int:pid>/add", methods=["POST"])
def add_member(pid):
    """Add a user as a member to a program."""
    pass


@members.route("/<int:uid>", methods=["DELETE"])
def remove_member(uid):
    """Delete a member from a program."""
    pass


@members.route("/<int:uid>/habits")
def member_habits(uid):
    """Get a list of a program member's habits (program-specific)."""
    pass


@members.route("/<int:uid>/habits/<int:hid>")
def member_habit(uid, hid):
    """Get the full details and history of a habit for a member."""
    pass


@members.route("/<int:uid>/stamper")
def member_stamper(uid):
    """Get the stamper for a member in a program."""
    pass


@members.route("/<int:uid>/stamper", methods=["PATCH"])
def change_stamper(uid):
    """Change a member's stamper."""
    pass


@members.route("/<int:uid>/stamper")
def remove_stamper():
    """Unassign a stamper from a member."""
    pass
