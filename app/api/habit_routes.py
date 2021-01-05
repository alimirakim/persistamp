from flask import Blueprint, redirect, jsonify, request
from sqlalchemy.orm import joinedload
from app.models import db, User, Program, Habit, Membership, DailyStamp
from app.schemas import user_schema, program_schema, habit_schema, membership_schema, dailystamp_schema, color_schema, stamp_schema
from app.utils import dump_data_list, validation_errors_to_error_messages
from app.forms import HabitForm
from flask_login import current_user


habit_routes = Blueprint("habits", __name__)


# TESTED Functions
@habit_routes.route("/programs/<int:pid>")
def program_habits(pid):
    """Get a list of a program's habits."""
    habits = Habit.query.filter(Habit.program_id == pid).all()
    return jsonify(dump_data_list(habits, habit_schema))


# TESTED Functions
@habit_routes.route("/<int:hid>/memberships/<int:mid>")
def habit_details(hid, mid):
    """Get a habit's details, including recent history."""
    # TODO Ask TA how to filter joinedload to only return dailystamps of 'member id blah', and filter attributes for each joinedload.
    habit = Habit.query.filter(Habit.id == hid).options( \
      joinedload(Habit.color), \
      joinedload(Habit.stamp), \
      joinedload(Habit.program), \
      joinedload(Habit.creator), \
      joinedload(Habit.daily_stamps)) \
      .one()
    habit_data = habit_schema.dump(habit)
    habit_data["color"] = color_schema.dump(habit.color)
    habit_data["stamp"] = stamp_schema.dump(habit.stamp)
    habit_data["program"] = program_schema.dump(habit.program)
    habit_data["creator"] = user_schema.dump(habit.creator)
    habit_data["daily_stamps"] = dailystamp_schema.dump([stamp for stamp in habit.daily_stamps if stamp.membership_id == mid])
    print("\nSINGLE HABIT DATA", habit_data)
    return jsonify(habit_data)



@habit_routes.route("/edit/<int:hid>", methods=["PATCH"])
def edit_habit(hid):
    """Edit a habit's details by id."""
    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        habit = Habit.query.get(hid)
        habit.habit = form.data['habit']
        habit.description = form.data['description']
        habit.frequency = form.data['frequency']
        habit.color_id = form.data['color']
        habit.stamp_id = form.data['stamp']
        db.session.commit()
        print("\nEDITED", habit)

        habit_data = habit_schema.dump(habit)
        habit_data["color"] = color_schema.dump(habit.color)
        habit_data["stamp"] = stamp_schema.dump(habit.stamp)
        print("\nEDITTED HABIT DUMP", habit_data)
        return jsonify(habit_data)
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
        newHabit = Habit(
            habit=form.data['habit'],
            description=form.data['description'],
            frequency=str(form.data['frequency']),
            color_id=form.data['color'],
            stamp_id=form.data['stamp'],
            creator_id=request.json['userId'],
            program_id=pid,
        )
        db.session.add(newHabit)
        db.session.commit()
        newHabit = Habit.query.options(joinedload(Habit.stamp), joinedload(Habit.color)).get(newHabit.id)
        habit = habit_schema.dump(newHabit)

        habit["color"] = color_schema.dump(newHabit.color)
        habit["stamp"] = stamp_schema.dump(newHabit.stamp)
        return jsonify(habit)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
