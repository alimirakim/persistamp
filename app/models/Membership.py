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
    daily_stamps = db.relationship("DailyStamp", back_populates="membership")
