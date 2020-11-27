from flask import Blueprint, jsonify
from app.models import db, User, Stamp, Program, Member, Habit, Reward, Color, DailyStamp
from app.schemas import user_schema, program_schema, habit_schema, member_schema, stamp_schema, color_schema, dailystamp_schema
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_user, logout_user, login_required
from app.utils import dump_data_list
from datetime import date, timedelta
import calendar
from pprint import pprint

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
    print(user_data, "--------------------HEREE--------------")
    del user_data["hashed_password"]
    return jsonify(user_data)


# TESTED Functions
@user_routes.route("/<int:uid>")
def user_details(uid):
    """Get a user's information by id."""
    user = User.query.get(uid)
    user_data = user_schema.dump(user)
    return jsonify(user_data)


@user_routes.route("/<int:uid>/options")
def user_options(uid):
    """Get the available color and stamp options for a user."""
    # redeemed_options = Redeemed.query.filter(Redeemed.type == 'color' or Redeemed.type == 'stamp', Redeemed.user_id == uid).all()
    # redeemed_colors = [o.reward for o in redeemed_options if o.type == 'color']
    # redeemed_stamps = [s.reward for s in redeemed_options if s.type == 'stamp']
    # colors = Color.query.filter(Color.color in redeemed_colors).all()
    # stamps = Stamp.query.filter(Stamp.stamp in redeemed_stamps).all()
    print("\nPRE COLOR STAMPS")
    colors = Color.query.all()
    stamps = Stamp.query.all()
    # print("\nCOLORS", colors)
    colors_data = dump_data_list(colors, color_schema)
    stamps_data = dump_data_list(stamps, stamp_schema)
    print("\n\nCOLORS, STAMPS", colors_data, stamps_data)
    
    return jsonify(colors_data=colors_data, stamps_data=stamps_data)


@user_routes.route("/<int:uid>/programs")
def user_programs(uid):
    """Get a user's subscribed programs."""
    current_date = date.today()
    past_week = [(current_date - timedelta(days=i)) for i in range(7)]
    past_week = [(day.strftime('%A')[0:3], day.strftime('%Y-%m-%d')) for day in past_week]
    
    print("\n\nUID", uid)
    user_programs = Program.query \
        .join(Member.program).filter(Member.member_id == uid) \
        .options(joinedload(Program.rewards), \
            joinedload(Program.members), \
            joinedload(Program.stamp), \
            joinedload(Program.color), \
            joinedload(Program.habits).joinedload(Habit.daily_stamps), \
            joinedload(Program.habits).joinedload(Habit.stamp), \
            joinedload(Program.habits).joinedload(Habit.color)) \
        .all()
    programs_data = dump_data_list(user_programs, program_schema)

    for i in range(len(user_programs)):
        if user_programs[i].members: 
            memberships = [m.id for m in current_user.memberships]
            print("\n\nmemberships", memberships)
            try:
                [mid] = [m for m in programs_data[i]["members"] if m in memberships]
                programs_data[i]["habits"] = []
                
                for j in range(len(user_programs[i].habits)):
                    programs_data[i]["habits"].append(habit_schema.dump(user_programs[i].habits[j]))
                    habit = habit_schema.dump(user_programs[i].habits[j])
                    habit["stamp"] = stamp_schema.dump(user_programs[i].habits[j].stamp)
                    habit["color"] = color_schema.dump(user_programs[i].habits[j].color)
                    # Daily stamps for prev week for habit
                    habit["daily_stamps"] = DailyStamp.query.filter( \
                        DailyStamp.habit_id == habit["id"], \
                        DailyStamp.member_id == mid, \
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
        
        
    print("\nPROGRAMS DATA")
    # pprint(programs_data)
    print("\nHABITS DATA")
    # pprint(habits_fin)
    print("\nDAILIES DATA")
    # pprint(dailies_fin)
    
    return jsonify(programs_data=programs_fin, habits_data=habits_fin, dailies_data=dailies_fin, past_week=past_week)