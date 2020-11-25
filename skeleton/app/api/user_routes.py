from flask import Blueprint, jsonify
from app.models import db, User, Stamp, Program, Member, Habit, Reward, Color, DailyStamp
from app.schemas import user_schema, program_schema, habit_schema, member_schema, stamp_schema, color_schema, dailystamp_schema
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_user, logout_user, login_required
from app.utils import dump_data_list

user_routes = Blueprint('users', __name__, url_prefix="/users")


@user_routes.route('/list')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/')
@login_required
def user():
    """Get a user's information by id."""
    user = User.query.filter(User.id == current_user.id).options(joinedload(User.stamp)).one()
    user_data = user_schema.dump(user)
    user_data["stamp"] = user.stamp.to_dict()
    print(user_data, "--------------------HEREE--------------")
    del user_data["hashed_password"]
    return jsonify(user_data)


# TODO How to filter by whether the program includes the member?
# TESTED Functions for grabbing 'all' no filter
@user_routes.route("/<int:uid>/programs")
def user_programs(uid):
    """Get a user's subscribed programs."""
    user_programs = Program.query \
        .join(Member.program).filter(Member.member_id == uid) \
        .join(DailyStamp) \
        .options(joinedload(Program.rewards), \
            joinedload(Program.members), \
            # joinedload(Stamp.programs), \
            joinedload(Program.stamp), \
            joinedload(Program.color), \
            joinedload(Program.habits).joinedload(Habit.daily_stamps), \
            joinedload(Program.habits).joinedload(Habit.stamp), \
            joinedload(Program.habits).joinedload(Habit.color)).all() \
        # .filter(DailyStamp.date <= past_week_dates[0], DailyStamp.date >= past_week_dates[6]) \
        # .all()
    programs_data = dump_data_list(user_programs, program_schema)
    for i in range(len(user_programs)):
        programs_data[i]["habits"] = []
        for j in range(len(user_programs[i].habits)):
            # programs_data[i]["habits"].append(habit_schema.dump(user_programs[i].habits[j]))
            habit = habit_schema.dump(user_programs[i].habits[j])
            habit["stamp"] = stamp_schema.dump(user_programs[i].habits[j].stamp)
            habit["color"] = color_schema.dump(user_programs[i].habits[j].color)
            habit["daily_stamps"] = []
            for k in range(len(user_programs[i].habits[j].daily_stamps)):
                habit["daily_stamps"].append(dailystamp_schema.dump(user_programs[i].habits[j].daily_stamps[k]))
            programs_data[i]["habits"].append(habit)
            programs_data[i]["habits"][j] = habit

        programs_data[i]["stamp"] = stamp_schema.dump(user_programs[i].stamp)
        programs_data[i]["color"] = color_schema.dump(user_programs[i].color)
    from pprint import pprint
    print("\nPROGRAMS DATA")
    pprint(programs_data)
    return jsonify(programs_data)
