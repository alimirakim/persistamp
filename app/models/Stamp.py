from .db import db
from datetime import date

class Stamp(db.Model):
    __tablename__ = "stamps"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=date.today())
    status = db.Column(db.String, nullable=False, default="stamped") #('unstamped', 'pending', 'stamped', name="status"))
    activity_id = db.Column(db.Integer, db.ForeignKey("activities.id"), nullable=False)
    membership_id = db.Column(db.Integer, db.ForeignKey("memberships.id"), nullable=False)

    activity = db.relationship("Activity", back_populates="stamps")
    membership = db.relationship("Membership", back_populates="stamps")

    def to_dict(self):
        """Return dict of stamp."""
        return {
            "id": self.id,
            "date": self.date.isoformat(),
            "status": self.status,
            "aid": self.activity_id,
            "mid": self.membership_id,
        }