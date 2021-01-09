from .db import db
from datetime import datetime, date, timedelta
from pprint import pprint

class Habit(db.Model):
    __tablename__ = "habits"
    id = db.Column(db.Integer, primary_key=True)
    habit = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250))
    frequency = db.Column(db.String(7), nullable=False, default="7")
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), default=1)
    icon_id = db.Column(db.Integer, db.ForeignKey("icons.id"), nullable=False, default=3)
    program_id = db.Column(db.Integer, db.ForeignKey("programs.id"))
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    # TODO habit+program should be unique

    icon = db.relationship("Icon", backref="habits")
    color = db.relationship("Color", backref="habits")
    program = db.relationship("Program", back_populates="habits")
    creator = db.relationship("User", back_populates="created_habits")
    stamps = db.relationship("Stamp", 
        back_populates="habit", 
        order_by="Stamp.date",
        cascade="all, delete-orphan")

    def to_dict(self):
        """Return dict of Habit"""
        return {
            "id": self.id,
            "title": self.habit,
            "description": self.description,
            "frequency": self.frequency,
            "color": self.color.hex,
            "icon": self.icon.title,
            "program_id": self.program_id,
            "created_at": self.created_at,
        }

    def week_stamps_for_member(self, mid):
        """Return past week's stamps for Habit and User."""
        current_date = date.today()
        past_week = [(current_date - timedelta(days=i)) for i in range(7)]
        past_week_days = [day.strftime('%A')[0:3] for day in past_week]
        past_week_dates = [date.strftime('%Y-%m-%d') for date in past_week]
        stamp_ids = []
        for stamp in self.stamps:
            if stamp.membership_id == mid and stamp.date <= past_week[0] and stamp.date >= past_week[6]:
                stamp_ids.append(stamp.id)
        return stamp_ids

    def to_dict_for_member(self, mid):
        """Return dict of Habit, including past week's stamps for User."""
        stamp_ids = self.week_stamps_for_member(mid)
        return {**self.to_dict(), "stamp_ids": stamp_ids}