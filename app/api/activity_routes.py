from flask import Blueprint, redirect, jsonify, request
from sqlalchemy.orm import joinedload
from app.models import db, User, Program, Activity, Membership
from app.schemas import user_schema, program_schema, activity_schema, membership_schema, stamp_schema, color_schema, stamp_schema
from app.utils import dump_data_list, validation_errors_to_error_messages
from app.forms import ActivityForm
from flask_login import current_user


activity_routes = Blueprint("activities", __name__)


# TESTED Functions
@activity_routes.route("/programs/<int:pid>")
def program_activities(pid):
    """Get a dict of a program's activities."""
    activities = Activity.query.filter(Activity.program_id == pid).all()
    return {activity.id:activity.to_dict() for activity in activities}


# TESTED Functions
# @activity_routes.route("/<int:aid>")
@activity_routes.route("/<int:aid>/memberships/<int:mid>")
def activity_details(aid, mid):
    """Get a activity's details for a user, including recent history."""
    activity = Activity.query.get(aid)
    member = Membership.query.get(mid).member
    # program = program_schema.dump(Program.query.get(activity.to_dict()["pid"]))
    # activityWProgram = activity.to_dict()
    # activityWProgram["program"] = program
    # return activityWProgram
    if activity:
        return activity.to_dict_for_user_details(member)
    return {'errors': ['User not found'] }, 404


@activity_routes.route("/<int:aid>/memberships/<int:mid>/switchPrivacy")
def switchPrivacy(aid, mid):
    activity = Activity.query.get(aid)
    member = Membership.query.get(mid).member

    if activity.private:
        activity.private = False
    else:
        activity.private = True
    db.session.commit()
    newActivity = activity.to_dict_for_user_details(member)
    return newActivity


@activity_routes.route("/edit/<int:aid>", methods=["PATCH"])
def edit_activity(aid):
    """Edit a activity's details by id."""
    form = ActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        activity = Activity.query.get(aid)
        activity.title = form.data["title"]
        activity.description = form.data['description']
        activity.frequency = form.data['frequency']
        activity.color_id = form.data['cid']
        activity.icon_id = form.data["iid"]
        db.session.commit()

        return activity.to_dict_for_user(current_user)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@activity_routes.route("/delete/<int:aid>", methods=["DELETE"])
def delete_activity(aid):
    """Delete a activity by id."""
    activity = Activity.query.get(aid)
    program = Program.query.get(activity.program_id)
    db.session.delete(activity)
    program.activity_ids_order.remove(aid)
    db.session.commit()
    return "Activity is donezo~!"


@activity_routes.route("/programs/<int:pid>/create", methods=["POST"])
def create_activity(pid):
    form = ActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        activity = Activity(
            title=form.data['title'],
            description=form.data['description'],
            frequency=str(form.data['frequency']),
            color_id=form.data['cid'],
            icon_id=form.data["iid"],
            creator_id=request.json['userId'],
            program_id=pid,
            stamp_value=form.data['stampValue'],
        )
        db.session.add(activity)
        db.session.commit() 
        
        program = Program.query.get(pid)
        program.activity_ids_order.append(activity.id)
        db.session.commit() 
        
        return activity.to_dict_for_user(current_user)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
