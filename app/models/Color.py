from .db import db


class Color(db.Model):
    __tablename__ = "colors"
    id = db.Column(db.Integer, primary_key=True)
    hex = db.Column(db.String(7), nullable=False, unique=True)
    name = db.Column(db.String(50), unique=True)
    mode = db.Column(db.String(50), default="night")

    users = db.relationship("User", back_populates="color")
    programs = db.relationship("Program", back_populates="color")
    habits = db.relationship("Habit", back_populates="color")
    rewards = db.relationship("Reward", back_populates="color")
