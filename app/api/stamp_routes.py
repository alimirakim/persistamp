from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from flask_login import current_user
from app.models import db, Activity, Stamp, Membership, Program
from app.schemas import stamp_schema

stamp_routes = Blueprint("stamps", __name__, url_prefix="/stamps")


# Grab all stamps for user and activity (full history)
# get all stamps for user and program (7 days)
# get all stamps for user (7 days)

@stamp_routes.route("/activities/<int:aid>")
def activity_stamps_full(aid):
    """Get all daily stamps for current user, full history."""
    stamps = Stamp.query.filter(Stamp.uid == current_user.id) \
      .filter(Stamp.aid == aid).all()
    
    return jsonify(stamps=[stamp_schema.dump(stamp) for stamp in stamps])


@stamp_routes.route("/programs/<int:pid>")
def program_stamps_current(pid):
    """Return daily stamps of the past week for current user and program."""
    stamps = Stamp.query.filter()



@stamp_routes.route("/current_week")
def current_week():
    """Get current user's stamps from the past 7 days"""
    
    current_date = date.today()
    past_week = [(current_date - timedelta(days=i)) for i in range(7)]
    past_week_days = [day.strftime('%A')[0:3] for day in past_week]
    past_week_dates = [date.strftime('%Y-%m-%d') for date in past_week]
    stamps = Stamp.query.filter(
        Stamp.uid == current_user.id, \
        Stamp.date <= past_week_dates[0], \
        Stamp.date >= past_week_dates[6]).all()
    return jsonify(days=past_week_days, dates=past_week_dates, stamps=[stamp.to_dict() for stamp in stamps])


@stamp_routes.route("/<int:aid>/programs/<int:pid>/memberships/<int:mid>/days/<day>", methods=["delete", "post"])
def stamp_day(pid, mid, aid, day):
    """Change the status of a stamp to 'stamped' or 'pending'."""
    print("stamping...", current_user.id)
    membership = Membership.query.get(mid)
    # day = date
    activity = Activity.query.get(aid)
    if request.method == "POST":
        stamp = Stamp.query.join(Membership.stamps).filter( \
            Stamp.activity_id == aid,  \
            Stamp.membership_id == mid, \
            Stamp.date == day) \
            .options(joinedload(Stamp.membership)).one_or_none()
        if not stamp:
            if membership.member_id == membership.stamper_id:
                stamp = Stamp( date=day,
                                    status='stamped',
                                    activity_id=aid,
                                    membership_id=mid,)
            else:
                stamp = Stamp( date=day,
                                    status='pending',
                                    activity_id=aid,
                                    membership_id=mid,)
            db.session.add(stamp)
        else:
            if stamp.status == 'pending' and current_user.id == stamper_id:
                stamp.status = 'stamped'
        if stamp.status == 'stamped':
            if Program.query.get(membership.program_id).has_shop:
                membership.points += activity.stamp_value
            else:
                current_user.points += activity.stamp_value
        db.session.commit()
        return stamp.to_dict()
    elif request.method == "DELETE":
        stamp = Stamp.query.filter( \
            Stamp.activity_id == aid,  \
            Stamp.membership_id == mid, \
            Stamp.date == day).one()
        print(stamp)
        db.session.delete(stamp)
        if Program.query.get(membership.program_id).has_shop:
            membership.points -= activity.stamp_value
        else:
            current_user.points -= activity.stamp_value
        db.session.commit()

        return stamp.to_dict()