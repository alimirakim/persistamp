from flask import Blueprint, redirect, jsonify, request
from sqlalchemy.orm import joinedload
from app.models import db, Membership, Program, User, Habit, Color
from app.schemas import membership_schema, program_schema, user_schema, habit_schema, stamp_schema, color_schema
from app.utils import dump_data_list

membership_routes = Blueprint("memberships", __name__, url_prefix="/memberships")


# PROGRAM MEMBERS
@membership_routes.route("/programs/<int:pid>")
def program_members(pid):
    """Get a list of a program's members."""
    memberships = Membership.query.filter(Membership.program_id == pid).all()
    return jsonify(dump_data_list(memberships, membership_schema))


@membership_routes.route("/<int:mid>")
def program_member(mid):
    """Get a member's details by id."""
    membership = Membership.query.filter(Membership.id == mid).one()
    return jsonify(membership_schema.dump(membership))


@membership_routes.route("/programs/<int:pid>/add/users/<int:uid>", methods=["POST"])
def add_member(pid, uid):
    """Add a user as a member to a program."""
    membership = Membership(program_id=pid,
                    member_id=uid,
                    stamper_id=uid,
                  )
    db.session.add(membership)
    db.session.commit()
    return jsonify(membership_schema.dump(membership))


@membership_routes.route("/<int:mid>", methods=["DELETE"])
def remove_member(mid):
    """Delete a member from a program."""
    membership = Membership.query.filter(Membership.id == mid).one()
    db.session.delete(membership)
    db.session.commit()
    return "Membership has been revoked! BD"


@membership_routes.route("/<int:mid>/habits")
def membership_habits(mid):
    """Get a list of a program member's habits (program-specific)."""
    habits = Habit.query.options(joinedload(Habit.stamp)).all() # dunno
    habits_data = dump_data_list(habits, habit_schema)
    for i in range(len(habits)):
        habit_stamp = stamp_schema.dump(habits[i].stamp)
        habit_color = color_schema.dump(habits[i].color)
        habits_data[i]["stamp"] = habit_stamp
        habits_data[i]["color"] = habit_color
    return jsonify(habits_data)


@membership_routes.route("/<int:mid>/habits/<int:hid>")
def membership_habit(mid, hid):
    """Get the full details and history of a habit for a member."""
    habit = Habit.query.filter(Habit.id == hid).one()
    return jsonify(habit_schema.dump(habit))


@membership_routes.route("/<int:mid>/stamper")
def membership_stamper(mid):
    """Get the stamper for a member in a program."""
    # stamper = User.query.filter().one()
    return jsonify(user_schema.dump(stamper))


@membership_routes.route("/<int:mid>/stamper/<int:uid>", methods=["PATCH"])
def change_stamper(mid, uid):
    """Change a member's stamper."""
    membership = Membership.query.filter(Membership.id == mid).one()
    membership.stamper_id = uid
    db.session.commit()
    return jsonify(membership_schema.dump(membership))


@membership_routes.route("/<int:mid>/stamper")
def remove_stamper():
    """Unassign a stamper from a member."""
    membership = Membership.query.filter(Membership.id == mid).one()
    membership.stamper_id = membership.member_id
    return jsonify(membership_schema.dump(membership))
