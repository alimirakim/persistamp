from flask import Blueprint, render_template, redirect, jsonify, request
from app.models import db, User, Program, Habit, Member, DailyStamp
from app.schemas import user_schema, program_schema, habit_schema, member_schema, dailystamp_schema
from app.utils import dump_data_list
from app.forms import HabitForm
from datetime import date, timedelta
import calendar

habit_routes = Blueprint("habits", __name__)


# TESTED Functions
@habit_routes.route("/programs/<int:pid>")
def program_habits(pid):
    """Get a list of a program's habits."""
    habits = Habit.query.filter(Habit.program_id == pid).all()
    return jsonify(dump_data_list(habits, habit_schema))

@habit_routes.route("<int:hid>/member/<int:mid>/current_week")
def current_week(hid, mid):
    """Get the past 7 days"""
    current_date = date.today()
    past_week = [(current_date - timedelta(days=i)) for i in range(7)]
    past_week_days = [day.strftime('%A')[0:3] for day in past_week]
    past_week_dates = [date.strftime('%Y-%m-%d') for date in past_week]
    print('past_week_days: ', past_week)
    print('past_week_dates: ', past_week_dates)
    stamps = DailyStamp.query.filter(DailyStamp.habit_id == hid, DailyStamp.member_id == mid, DailyStamp.date <= past_week_dates[0], DailyStamp.date >= past_week_dates[6]).all()
    return jsonify(days=past_week_days, dates=past_week_dates, stamps=[dailystamp_schema.dump(stamp) for stamp in stamps])


#get graph data for habit (weekly) - userId, habit_id
@habit_routes.route("/data/week")
def getWeeklyData():
    print("REQUEST: ", request.json)
    uid = request.json["userId"]
    hid = request.json["habit_id"]
    current_date = date.today()
    print("CURRENT DATE:  ", current_date)
    past_fourteen_weeks = [(current_date - timedelta(days=i)) for i in range(98)]
    print("PAST WEEK:  ", past_fourteen_weeks)
    past_week_dates = [date.strftime('%Y-%m-%d') for date in past_fourteen_weeks]
    print('past_week_dates: ', past_week_dates)
    stamps = DailyStamp.query.filter(DailyStamp.habit_id == hid, DailyStamp.member_id == uid, DailyStamp.date <= past_week_dates[0], DailyStamp.date >= past_week_dates[-1]).all()
    print("STAMPS", stamps)
    return


# TESTED Functions
@habit_routes.route("/<int:hid>")
def habit_details(hid):
    """Get a habit's details, including recent histories for all members."""
    habit = Habit.query.filter(Habit.id == hid).one()
    return jsonify(habit_schema.dump(habit))


# TESTED Functions. Should the route just be / and just pass in program id?
@habit_routes.route("/programs/<int:pid>", methods=["POST"])
def create_habit(pid):
    """Create a new habit for a program."""
    data = request.json
    habit = Habit(habit=data["habit"],
                  program_id=pid,
                  creator_id=data["creator_id"],)
    if "description" in data.keys():
        habit.description = data["description"]
    if "frequency" in data.keys():
        habit.frequency = data["frequency"]
    if "color" in data.keys():
        habit.color = data["color"]
    if "stamp_id" in data.keys():
        habit.stamp_id = data["stamp_id"]

    db.session.add(habit)
    db.session.commit()
    return jsonify(habit_schema.dump(habit))


# TESTED Functions.
@habit_routes.route("/<int:hid>", methods=["PATCH"])
def edit_habit(hid):
    """Edit a habit's details by id."""
    data = request.json
    habit = Habit.query.filter(Habit.id == hid).one()
    if "habit" in data.keys():
        habit.habit = data["habit"]
    if "description" in data.keys():
        habit.description = data["description"]
    if "frequency" in data.keys():
        habit.frequency = data["frequency"]
    if "color" in data.keys():
        habit.color = data["color"]
    if "stamp_id" in data.keys():
        habit.stamp_id = data["stamp_id"]
    db.session.commit()
    return jsonify(habit_schema.dump(habit))


# TESTED Functions
@habit_routes.route("/<int:hid>", methods=["DELETE"])
def delete_habit(hid):
    """Delete a habit by id."""
    habit = Habit.query.filter(Habit.id == hid).one()
    db.session.delete(habit)
    db.session.commit()
    return "Habit is donezo~!"


# How to get the date/daily stamp through params?
# Get the stamper for the daily stamp's member
# If no stamper, just toggle the status.
# If stamper, check stamper id from params. If it's the member, NOT stamper,
# change to pending. If it IS the stamper, change to checked or unchecked.
@habit_routes.route("/dailystamps/<int:sid>/stamper/<int:uid>", methods=["POST"])
def stamp_day(sid, uid):
    """Change the status of a daily_stamp to 'stamped' or 'pending'."""
    day = DailyStamp.query.filter(DailyStamp.id == sid)
    if uid == day.member.stamper_id:
        if day.status == 'unstamped' or day.status == 'pending':
            day.status = 'stamped'
        elif day.status == 'stamped':
            day.status = 'unstamped'
    elif uid == day.member_id:
        if day.status == 'unstamped':
            day.status = 'pending'
        elif day.status == 'pending':
            day.status = 'unstamped'
    return jsonify(dailystamp_schema.dump(day))


# @habit_routes.route("/create", methods=["POST"])
# def create_habit():
#     form = HabitForm()
#     print(form)

#     if form.validate_on_submit():
#         newHabit = Habit(
#             habit=form.data['habit'],
#             description=form.data['description'],
#             frequency=form.data['frequency'],
#             color=form.data['color'],
#         )
#         db.session.add(newHabit)
#         db.session.commit()
#         return newHabit.to_dict()
#     return "Error"
