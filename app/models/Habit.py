from .db import db
from datetime import datetime


class Habit(db.Model):
    __tablename__ = "habits"
    id = db.Column(db.Integer, primary_key=True)
    habit = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250))
    frequency = db.Column(db.String(7), nullable=False, default="7")
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), default=1)
    stamp_id = db.Column(db.Integer, db.ForeignKey("stamps.id"), nullable=False, default=3)
    program_id = db.Column(db.Integer, db.ForeignKey("programs.id"))
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    # TODO habit+program should be unique

    stamp = db.relationship("Stamp", back_populates="habits")
    color = db.relationship("Color", back_populates="habits")
    program = db.relationship("Program", back_populates="habits")
    creator = db.relationship("User", back_populates="created_habits")
    daily_stamps = db.relationship("DailyStamp", 
        back_populates="habit", 
        order_by="DailyStamp.date",
        cascade="all, delete-orphan")

    def to_dict(self):
      return {
        "id": self.id
      }