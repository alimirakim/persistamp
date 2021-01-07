from flask import Blueprint, jsonify, request
from app.models import db, User, Stamp, Program, Membership, Habit, Reward, Color, Stamp
from app.schemas import user_schema, program_schema, habit_schema, membership_schema, icon_schema, color_schema, stamp_schema
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
    user = User.query.get(current_user.id)
    return user.to_dict()


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
            joinedload(Program.habits).joinedload(Habit.stamps), \
            joinedload(Program.habits).joinedload(Habit.icon), \
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
                    habit["icon"] = icon_schema.dump(user_programs[i].habits[j].icon)
                    habit["color"] = color_schema.dump(user_programs[i].habits[j].color)
                    # Daily icons for prev week for habit
                    habit["stamps"] = Stamp.query.filter( \
                        Stamp.habit_id == habit["id"], \
                        Stamp.membership_id == mid, \
                        Stamp.date <= past_week[0][1], \
                        Stamp.date >= past_week[6][1]).all()
                    habit["stamps"] = dump_data_list(habit["stamps"], stamp_schema)
                    programs_data[i]["habits"][j] = habit
            except:
                print("\nno mid probs")
        programs_data[i]["icon"] = icon_schema.dump(user_programs[i].icon)
        programs_data[i]["color"] = color_schema.dump(user_programs[i].color)

    programs_fin = {}
    habits_fin = {}
    dailies_fin = {}
    for program in programs_data:
        habits_fin.update({habit["id"]:habit for habit in program["habits"]})
        program["habits"] = [habit["id"] for habit in program["habits"]]
        programs_fin.update({program["id"]: program})

    for habit in habits_fin.values():
        dailies_fin.update({stamp["id"]:stamp for stamp in habit["stamps"]})
        habit["stamps"] = [daily["id"] for daily in habit["stamps"]]
        
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
        user.birthday = form.data['birthday']
        user.color_id = form.data['color']
        user.icon_id = form.data['icon']
        db.session.commit()

        newUser = queryUserFullData(user.id)
        return jsonify(newUser)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
