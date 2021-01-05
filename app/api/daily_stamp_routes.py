from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from flask_login import current_user
from app.models import db, DailyStamp, Membership
from app.schemas import dailystamp_schema

daily_stamp_routes = Blueprint("stamps", __name__, url_prefix="/daily-stamps")


# Grab all stamps for user and habit (full history)
# get all stamps for user and program (7 days)
# get all stamps for user (7 days)

@daily_stamp_routes.route("/habits/<int:hid>")
def habit_stamps_full(hid):
    """Get all daily stamps for current user, full history."""
    daily_stamps = DailyStamp.query.filter(DailyStamp.user_id == current_user.id) \
      .filter(DailyStamp.habit_id == hid).all()
    
    return jsonify(stamps=[dailystamp_schema.dump(stamp) for stamp in daily_stamps])


@daily_stamp_routes.route("/programs/<int:pid>")
def program_stamps_current(pid):
    """Return daily stamps of the past week for current user and program."""
    daily_stamps = DailyStamp.query.filter()



@daily_stamp_routes.route("/current_week")
def current_week():
    """Get current user's stamps from the past 7 days"""
    
    current_date = date.today()
    past_week = [(current_date - timedelta(days=i)) for i in range(7)]
    past_week_days = [day.strftime('%A')[0:3] for day in past_week]
    past_week_dates = [date.strftime('%Y-%m-%d') for date in past_week]
    stamps = DailyStamp.query.filter(
        DailyStamp.user_id == current_user.id, \
        DailyStamp.date <= past_week_dates[0], \
        DailyStamp.date >= past_week_dates[6]).all()
    return jsonify(days=past_week_days, dates=past_week_dates, stamps=[dailystamp_schema.dump(stamp) for stamp in stamps])


@daily_stamp_routes.route("/<int:hid>/programs/<int:pid>/memberships/<int:mid>/days/<day>", methods=["delete", "post"])
def stamp_day(pid, mid, hid, day):
    """Change the status of a daily_stamp to 'stamped' or 'pending'."""
    print("stamping...")
    membership = Membership.query.get(mid)
    # day = date
    if request.method == "POST":
        stamp = DailyStamp.query.join(Membership.daily_stamps).filter( \
            DailyStamp.habit_id == hid,  \
            DailyStamp.membership_id == mid, \
            DailyStamp.date == day) \
            .options(joinedload(DailyStamp.membership)).one_or_none()
        if not stamp:
            if membership.member_id == membership.stamper_id:
                stamp = DailyStamp( date=day,
                                    status='stamped',
                                    habit_id=hid,
                                    membership_id=mid,)
            else:
                stamp = DailyStamp( date=day,
                                    status='pending',
                                    habit_id=hid,
                                    membership_id=mid,)
            db.session.add(stamp)
        else:
            if stamp.status == 'pending' and current_user.id == stamp.stamper_id:
                stamp.status = 'stamped'
        if stamp.status == 'stamped':
            membership.points += 1
        db.session.commit()
        return jsonify(dailystamp_schema.dump(stamp))
    elif request.method == "DELETE":
        stamp = DailyStamp.query.filter( \
            DailyStamp.habit_id == hid,  \
            DailyStamp.membership_id == mid, \
            DailyStamp.date == day).one_or_none()
        db.session.delete(stamp)
        membership.points -= 1
        db.session.commit()

        return jsonify("Stampy deleted :C ")