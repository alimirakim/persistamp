from .db import db
from datetime import datetime


class Membership(db.Model):
    __tablename__ = "memberships"
    id = db.Column(db.Integer, primary_key=True)
    program_id = db.Column(db.Integer, db.ForeignKey("programs.id"), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    stamper_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    points = db.Column(db.Integer, nullable=False, default=0)
    joined_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    # TODO Program+member should be unique

    program = db.relationship("Program", back_populates="memberships")
    member = db.relationship("User", foreign_keys=[member_id], back_populates="memberships")
    stamper = db.relationship("User", foreign_keys=[stamper_id], back_populates="stampers")
    stamps = db.relationship("Stamp", back_populates="membership")

    def to_dict(self):
        """Returns dict of Membership."""
        member_activity_stamps = {}
        for activity in self.program.activities:
            member_activity_stamps[activity.id] = sorted([s.id for s in activity.stamps if s.membership_id == self.id], reverse=True)
        
        return {
          "id": self.id,
          "pid": self.program_id,
          "mid": self.member_id,
          "stamper_id": self.stamper_id,
          "points": self.points,
          "joined_at": self.joined_at,
          # habid_id stamp_ids
          # "stamp_ids": [s.id for s in self.stamps],
        }
  
    def to_dict_for_program(self):
        """Return info on stamper, points, and joined_at for a Program."""
        return {
          "mid": self.id,
          "stamper_id": self.stamper_id,
          "points": self.points,
          "joined_at": self.joined_at,
        }