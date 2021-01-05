from .db import db
from datetime import datetime

class DailyStamp(db.Model):
    __tablename__ = "daily_stamps"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=datetime.today())
    status = db.Column(db.String, nullable=False, default="stamped") #('unstamped', 'pending', 'stamped', name="status"))
    habit_id = db.Column(db.Integer, db.ForeignKey("habits.id"), nullable=False)
    membership_id = db.Column(db.Integer, db.ForeignKey("memberships.id"), nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    habit = db.relationship("Habit", back_populates="daily_stamps")
    membership = db.relationship("Membership", back_populates="daily_stamps")

    def get_uid(self):
        """Return user id of DailyStamp"""
        return self.membership.member_id