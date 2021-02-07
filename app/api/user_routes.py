from flask import Blueprint, jsonify, request
from app.models import db, User, Stamp, Program, Membership, Activity, Reward, Color, Stamp
from app.schemas import user_schema, program_schema, activity_schema, membership_schema, icon_schema, color_schema, stamp_schema
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_user, logout_user, login_required
from datetime import date, timedelta
import calendar
from pprint import pprint
from app.forms import UserForm
from app.utils import queryUserFullData, validation_errors_to_error_messages, dump_data_list, get_past_week
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
    return queryUserFullData(current_user.id)


# TESTED Functions
@user_routes.route("/<int:uid>")
def user_details(uid):
    """Get a user's information by id."""
    return queryUserFullData(uid)


@user_routes.route("/<int:uid>/programs")
def user_programs(uid):
    """Get a user's subscribed programs."""
    user = current_user.to_dict()
    past_week = get_past_week()
    user_programs = Program.query \
        .join(Membership.program).filter(Membership.member_id == uid) \
        .options(joinedload(Program.rewards), \
            joinedload(Program.memberships), \
            joinedload(Program.activities).joinedload(Activity.stamps)) \
        .all()
        
    programs_data = {p.id:p.to_dict() for p in user_programs}
    activities_data = {}
    stamps_data = {}
    
    for program in user_programs:
        program_mids = [m.id for m in program.memberships]
        mid = next(m for m in program_mids if m in user["mids"])
        for activity in program.activities:
            activities_data[activity.id] = activity.to_dict()
            
            # Stamps for prev week for activity
            stamps = Stamp.query.filter( \
                Stamp.activity_id == activity.id, \
                Stamp.membership_id == mid, \
                Stamp.date <= past_week[0][1], \
                Stamp.date >= past_week[6][1]).all()
            for stamp in stamps:
                stamps_data[stamp.id] = stamp.to_dict()
            activities_data[activity.id]["week_stamps"] = [s.id for s in stamps]
        
    print("\nfinal")
    pprint(stamps_data)
    return jsonify(
        programs_data=programs_data, 
        activities_data=activities_data, 
        stamps_data=stamps_data, 
        past_week=past_week,)


@user_routes.route("/settings", methods=['PUT'])
@login_required
def update_user():
    print("\nreq", request.data)
    form = UserForm()
    print("\nupdated", form.data)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        user = User.query.filter(User.id == current_user.id).one()
        user.username = form.data['username']
        user.first_name = form.data['firstname']
        user.last_name = form.data['lastname']
        user.birthday = form.data['birthday']
        user.color_id = form.data['cid']
        user.icon_id = form.data['iid']
        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
