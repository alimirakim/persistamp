from .db import db
# from .Mixin import Mixin
from datetime import datetime, date, timedelta
from pprint import pprint


# class Activity(Mixin, db.Model):
class Activity(db.Model):
    __tablename__ = "activities"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(25), nullable=False)
    description = db.Column(db.String(250))
    stamp_value = db.Column(db.Integer, default=1, nullable=False)
    frequency = db.Column(db.Integer, default=1)
    interval = db.Column(db.Integer, default=7) # can apply if frequency applies
    quota = db.Column(db.Integer)
    expiry = db.Column(db.DateTime)
    bonus = db.Column(db.Integer) # can apply if quota applies
    
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    program_id = db.Column(db.Integer, db.ForeignKey("programs.id"))
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), nullable=False)
    icon_id = db.Column(db.Integer, db.ForeignKey("icons.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    is_private = db.Column(db.Boolean, default=False, nullable=False)
    
    # TODO activity+program should be unique
    db.UniqueConstraint('program_id', 'id', name="program_activity")
    creator = db.relationship("User", back_populates="created_activities")
    color = db.relationship("Color", backref="activities")
    icon = db.relationship("Icon", backref="activities")
    program = db.relationship("Program", back_populates="activities")
    stamps = db.relationship("Stamp",
        back_populates="activity",
        order_by="Stamp.date",
        cascade="all, delete-orphan")

    def to_dict(self):
        """Return dict of Activity"""
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "stamp_value": self.stamp_value,
            "frequency": self.frequency,
            "interval": self.interval,
            "quota": self.quota,
            "expiry": self.expiry,
            "bonus": self.bonus, 
            "cid": self.color_id,
            "iid": self.icon_id,
            "pid": self.program_id,
            "created_at": self.created_at,
            "is_private": self.is_private,
            "program_title": self.program.title,
        }

    def week_stamps_for_user(self, user):
        """Return past week's stamps for Activity and User."""
        membership_ids = [m.id for m in user.memberships]
        current_date = date.today()
        past_week = [(current_date - timedelta(days=i)) for i in range(7)]
        past_week_days = [day.strftime('%A')[0:3] for day in past_week]
        past_week_dates = [date.strftime('%Y-%m-%d') for date in past_week]
        stamp_ids = []
        for stamp in self.stamps:
            if stamp.membership_id in membership_ids and stamp.date <= past_week[0] and stamp.date >= past_week[6]:
                stamp_ids.append(stamp.id)
        return stamp_ids

    def all_stamps_for_user(self, user):
        """Return the full history of this activity's stamps for the User"""
        membership_ids = [m.id for m in user.memberships]
        stamp_ids = []
        for stamp in self.stamps:
            if stamp.membership_id in membership_ids:
                stamp_ids.append(stamp.id)
        return stamp_ids

    def to_dict_for_user(self, user):
        """Return dict of Activity, including past week's stamps for User."""
        stamp_ids = self.week_stamps_for_user(user)
        return {**self.to_dict(), "sids": stamp_ids}

    def to_dict_for_user_details(self, user):
        """Return dict of Activity, including past week's stamps for User."""
        stamp_ids = self.all_stamps_for_user(user)
        activity_dict = self.to_dict()
        activity_dict["program"] = self.program.to_dict()
        return {**activity_dict, "sids": stamp_ids, "username": user.username}
