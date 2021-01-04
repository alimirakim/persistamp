from flask import Blueprint, render_template, redirect, jsonify, request
from sqlalchemy.orm import joinedload
from app.models import db, Member, Program, User, Habit, Color
from app.schemas import member_schema, program_schema, user_schema, habit_schema, stamp_schema, color_schema
from app.utils import dump_data_list
member_routes = Blueprint("members", __name__, url_prefix="/members")


# PROGRAM MEMBERS
@member_routes.route("/programs/<int:pid>")
def program_members(pid):
    """Get a list of a program's members."""
    members = Member.query.filter(Member.program_id == pid).all()
    return jsonify(dump_data_list(members, member_schema))


@member_routes.route("/<int:mid>")
def program_member(mid):
    """Get a member's details by id."""
    member = Member.query.filter(Member.id == mid).one()
    return jsonify(member_schema.dump(member))


@member_routes.route("/programs/<int:pid>/add/users/<int:uid>", methods=["POST"])
def add_member(pid, uid):
    """Add a user as a member to a program."""
    member = Member(program_id=pid,
                    member_id=uid,
                    stamper_id=uid,
                  )
    db.session.add(member)
    db.session.commit()
    return jsonify(member_schema.dump(member))


@member_routes.route("/<int:mid>", methods=["DELETE"])
def remove_member(mid):
    """Delete a member from a program."""
    member = Member.query.filter(Member.id == mid).one()
    db.session.delete(member)
    db.session.commit()
    return "Membership has been revoked! BD"


@member_routes.route("/<int:mid>/habits")
def member_habits(mid):
    """Get a list of a program member's habits (program-specific)."""
    habits = Habit.query.options(joinedload(Habit.stamp)).all() # dunno
    habits_data = dump_data_list(habits, habit_schema)
    for i in range(len(habits)):
        habit_stamp = stamp_schema.dump(habits[i].stamp)
        habit_color = color_schema.dump(habits[i].color)
        habits_data[i]["stamp"] = habit_stamp
        habits_data[i]["color"] = habit_color
    return jsonify(habits_data)


@member_routes.route("/<int:mid>/habits/<int:hid>")
def member_habit(mid, hid):
    """Get the full details and history of a habit for a member."""
    habit = Habit.query.filter(Habit.id == hid).one()
    return jsonify(habit_schema.dump(habit))


@member_routes.route("/<int:mid>/stamper")
def member_stamper(mid):
    """Get the stamper for a member in a program."""
    # stamper = User.query.filter().one()
    return jsonify(user_schema.dump(stamper))


@member_routes.route("/<int:mid>/stamper/<int:uid>", methods=["PATCH"])
def change_stamper(mid, uid):
    """Change a member's stamper."""
    member = Member.query.filter(Member.id == mid).one()
    member.stamper_id = uid
    db.session.commit()
    return jsonify(member_schema.dump(member))


@member_routes.route("/<int:mid>/stamper")
def remove_stamper():
    """Unassign a stamper from a member."""
    member = Member.query.filter(Member.id == mid).one()
    member.stamper_id = member.member_id
    return jsonify(member_schema.dump(member))
