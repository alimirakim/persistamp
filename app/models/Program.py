from .db import db
from datetime import datetime


class Program(db.Model):
    __tablename__ = "programs"
    id = db.Column(db.Integer, primary_key=True)
    program = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250))
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), default=1)
    stamp_id = db.Column(db.Integer, db.ForeignKey("stamps.id"), nullable=False, default=2)
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    stamp = db.relationship("Stamp", back_populates="programs")
    color = db.relationship("Color", back_populates="programs")
    memberships = db.relationship("Membership", back_populates="program", cascade="all, delete-orphan")
    habits = db.relationship("Habit", back_populates="program", cascade="all, delete-orphan")
    rewards = db.relationship("Reward", back_populates="program")#, cascade="all, delete-orphan")
    creator = db.relationship("User", back_populates="created_programs")
