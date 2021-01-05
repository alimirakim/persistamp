from flask import Blueprint, jsonify, request
from app.models import db, User, Stamp, Program, Membership, Habit, Reward, Color, DailyStamp
from app.schemas import user_schema, program_schema, habit_schema, membership_schema, stamp_schema, color_schema, dailystamp_schema
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_user, logout_user, login_required
from datetime import date, timedelta
import calendar
from pprint import pprint
from app.forms import UserForm
from app.utils import validation_errors_to_error_messages, dump_data_list, get_past_week

user_routes = Blueprint('users', __name__, url_prefix="/users")


@user_routes.route('/list')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/')
@login_required
def user():
    """Get the current user's information."""
    user = User.query.filter(User.id == current_user.id).options(joinedload(User.stamp)).one()
    user_data = user_schema.dump(user)
    user_data["stamp"] = user.stamp.to_dict()
    del user_data["hashed_password"]
    return jsonify(user_data)


# TESTED Functions
@user_routes.route("/<int:uid>")
def user_details(uid):
    """Get a user's information by id."""
    user = User.query.get(uid)
    user_data = user_schema.dump(user)
    return jsonify(user_data)


@user_routes.route("/<int:uid>/programs")
def user_programs(uid):
    """Get a user's subscribed programs."""
    past_week = get_past_week()
    user_programs = Program.query \
        .join(Membership.program).filter(Membership.member_id == uid) \
        .options(joinedload(Program.rewards), \
            joinedload(Program.memberships), \
            joinedload(Program.stamp), \
            joinedload(Program.color), \
            joinedload(Program.habits).joinedload(Habit.daily_stamps), \
            joinedload(Program.habits).joinedload(Habit.stamp), \
            joinedload(Program.habits).joinedload(Habit.color)) \
        .all()
    programs_data = dump_data_list(user_programs, program_schema)

    for i in range(len(user_programs)):
        if user_programs[i].memberships:
            memberships = [m.id for m in current_user.memberships]
            try:
                [mid] = [m for m in programs_data[i]["memberships"] if m in memberships]
                programs_data[i]["habits"] = []

                for j in range(len(user_programs[i].habits)):
                    programs_data[i]["habits"].append(habit_schema.dump(user_programs[i].habits[j]))
                    habit = habit_schema.dump(user_programs[i].habits[j])
                    habit["stamp"] = stamp_schema.dump(user_programs[i].habits[j].stamp)
                    habit["color"] = color_schema.dump(user_programs[i].habits[j].color)
                    # Daily stamps for prev week for habit
                    habit["daily_stamps"] = DailyStamp.query.filter( \
                        DailyStamp.habit_id == habit["id"], \
                        DailyStamp.membership_id == mid, \
                        DailyStamp.date <= past_week[0][1], \
                        DailyStamp.date >= past_week[6][1]).all()
                    habit["daily_stamps"] = dump_data_list(habit["daily_stamps"], dailystamp_schema)
                    programs_data[i]["habits"][j] = habit
            except:
                print("\nno mid probs")
        programs_data[i]["stamp"] = stamp_schema.dump(user_programs[i].stamp)
        programs_data[i]["color"] = color_schema.dump(user_programs[i].color)

    programs_fin = {}
    habits_fin = {}
    dailies_fin = {}
    for program in programs_data:
        habits_fin.update({habit["id"]:habit for habit in program["habits"]})
        program["habits"] = [habit["id"] for habit in program["habits"]]
        programs_fin.update({program["id"]: program})

    for habit in habits_fin.values():
        dailies_fin.update({stamp["id"]:stamp for stamp in habit["daily_stamps"]})
        habit["daily_stamps"] = [daily["id"] for daily in habit["daily_stamps"]]
        
    return jsonify(programs_data=programs_fin, habits_data=habits_fin, dailies_data=dailies_fin, past_week=past_week)


@user_routes.route("/settings", methods=['PUT'])
@login_required
def update_user():
    form = UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        user = User.query.filter(User.id == current_user.id).one()
        user.username = form.data['username']
        user.first_name = form.data['firstname']
        user.last_name = form.data['lastname']
        user.color_id = form.data['color']
        user.stamp_id = form.data['stamp']
        db.session.commit()

        newUser = queryUserFullData(user.id)
        return jsonify(newUser)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
