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
        """Return dict of Program"""
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "color": self.color.hex,
            "icon": self.icon.title,
            "created_at": self.created_at,
            "membership_ids": [m.id for m in self.memberships],
            "habit_ids": [h.id for h in self.habits],
        }
    
    def get_mids(self):
        """Return list of program's membership ids."""
        return [m.id for m in self.memberships]
    
    def get_user_program_membership(self, uid):
        """Return the mid of the inputted user."""
        return next(m for m in self.memberships if m.member == uid)
    
    def to_dict_for_user(self, uid):
        """Return dict of Program including a user membership"""
        membership = next(m for m in self.memberships if m.member_id == uid)
        membership = membership.to_dict_for_program()
        return {**self.to_dict(), **membership}