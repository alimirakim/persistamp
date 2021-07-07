from .db import db
from sqlalchemy.dialects.postgresql import ARRAY
from .MutableList import MutableList
from datetime import datetime


class Program(db.Model):
    __tablename__ = "programs"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(25), nullable=False)
    description = db.Column(db.String(250))
    icon_id = db.Column(db.Integer, db.ForeignKey("icons.id"), nullable=False, default=2)
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), default=1)
    private = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    activity_ids_order = db.Column(MutableList.as_mutable(ARRAY(db.Integer)), nullable=False, default=[])
    reward_ids_order = db.Column(ARRAY(db.Integer), nullable=False, default=[])
    has_shop = db.Column(db.Boolean, default=True)

    icon = db.relationship("Icon", backref="programs")
    color = db.relationship("Color", backref="programs")
    memberships = db.relationship("Membership", back_populates="program", cascade="all, delete-orphan")
    activities = db.relationship("Activity", back_populates="program", cascade="all, delete-orphan")
    rewards = db.relationship("Reward", back_populates="program")#, cascade="all, delete-orphan")
    creator = db.relationship("User", back_populates="created_programs")

    def to_dict(self):
        """Return dict of Program"""
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "cid": self.color.id,
            "iid": self.icon.id,
            "created_at": self.created_at,
            "mids": [m.id for m in self.memberships],
            "aids": [h.id for h in self.activities],
            "private": self.private,
            "aids_order": self.activity_ids_order,
            "rew_ids_order": self.reward_ids_order,
            "has_shop": self.has_shop,
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