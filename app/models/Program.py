from .db import db
from datetime import datetime


class Program(db.Model):
    __tablename__ = "programs"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250))
    icon_id = db.Column(db.Integer, db.ForeignKey("icons.id"), nullable=False, default=2)
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), default=1)
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    icon = db.relationship("Icon", backref="programs")
    color = db.relationship("Color", backref="programs")
    memberships = db.relationship("Membership", back_populates="program", cascade="all, delete-orphan")
    habits = db.relationship("Habit", back_populates="program", cascade="all, delete-orphan")
    rewards = db.relationship("Reward", back_populates="program")#, cascade="all, delete-orphan")
    creator = db.relationship("User", back_populates="created_programs")

    def to_dict(self):
        """"""
        return {
            "id": self.id,
            "title": self.title,
            "color": self.color.hex,
            "icon": self.icon.title,
            "created_at": self.created_at,
            "membership_ids": [m.id for m in self.memberships],
            "habit_ids": [h.id for h in self.habits],
        }