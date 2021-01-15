from .db import db
from datetime import date

class Stamp(db.Model):
    __tablename__ = "stamps"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=date.today())
    status = db.Column(db.String, nullable=False, default="stamped") #('unstamped', 'pending', 'stamped', name="status"))
    habit_id = db.Column(db.Integer, db.ForeignKey("habits.id"), nullable=False)
    membership_id = db.Column(db.Integer, db.ForeignKey("memberships.id"), nullable=False)

    habit = db.relationship("Habit", back_populates="stamps")
    membership = db.relationship("Membership", back_populates="stamps")

    def to_dict(self):
        """"""
        return {
            "id": self.id,
            "date": self.date.isoformat(),
            "status": self.status,
            "hid": self.habit_id,
            "mid": self.membership_id,
        }