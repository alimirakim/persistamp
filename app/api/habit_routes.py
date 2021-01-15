from flask import Blueprint, redirect, jsonify, request
from sqlalchemy.orm import joinedload
from app.models import db, User, Program, Habit, Membership
from app.schemas import user_schema, program_schema, habit_schema, membership_schema, stamp_schema, color_schema, stamp_schema
from app.utils import dump_data_list, validation_errors_to_error_messages
from app.forms import HabitForm
from flask_login import current_user


habit_routes = Blueprint("habits", __name__)


# TESTED Functions
@habit_routes.route("/programs/<int:pid>")
def program_habits(pid):
    """Get a dict of a program's habits."""
    habits = Habit.query.filter(Habit.program_id == pid).all()
    return {habit.id:habit.to_dict() for habit in habits}


# TESTED Functions
# @habit_routes.route("/<int:hid>")
@habit_routes.route("/<int:hid>/memberships/<int:mid>")
def habit_details(hid, mid):
    """Get a habit's details for a user, including recent history."""
    habit = Habit.query.get(hid)
    program = program_schema.dump(Program.query.get(habit.to_dict()["pid"]))
    habitWProgram = habit.to_dict()
    habitWProgram["program"] = program
    return habitWProgram
    # return habit.to_dict_for_user(current_user)


@habit_routes.route("/<int:hid>/switchPrivacy")
def switchPrivacy(hid):
    habit = Habit.query.get(hid)
    program = program_schema.dump(Program.query.get(habit.to_dict()["pid"]))

    if habit.private:
        habit.private = False
    else:
        habit.private = True
    db.session.commit()
    newHabit = habit.to_dict()
    newHabit["program"] = program
    return newHabit


@habit_routes.route("/edit/<int:hid>", methods=["PATCH"])
def edit_habit(hid):
    """Edit a habit's details by id."""
    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        habit = Habit.query.get(hid)
        habit.title = form.data["title"]
        habit.description = form.data['description']
        habit.frequency = form.data['frequency']
        habit.color_id = form.data['cid']
        habit.icon_id = form.data["iid"]
        db.session.commit()

        return habit.to_dict_for_user(current_user)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@habit_routes.route("/delete/<int:hid>", methods=["DELETE"])
def delete_habit(hid):
    """Delete a habit by id."""
    habit = Habit.query.get(hid)
    db.session.delete(habit)
    db.session.commit()
    return "Habit is donezo~!"


@habit_routes.route("/programs/<int:pid>/create", methods=["POST"])
def create_habit(pid):
    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        habit = Habit(
            title=form.data['title'],
            description=form.data['description'],
            frequency=str(form.data['frequency']),
            color_id=form.data['cid'],
            icon_id=form.data["iid"],
            creator_id=request.json['userId'],
            program_id=pid,
        )
        db.session.add(habit)
        db.session.commit()
        habit = Habit.query.get(habit.id)
        return habit.to_dict_for_user(current_user)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
