from .db import db
from datetime import datetime


class Habit(db.Model):
    __tablename__ = "habits"
    id = db.Column(db.Integer, primary_key=True)
    habit = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250))
    frequency = db.Column(db.String(7), nullable=False, default="7")
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), default=1)
    icon_id = db.Column(db.Integer, db.ForeignKey("icons.id"), nullable=False, default=3)
    program_id = db.Column(db.Integer, db.ForeignKey("programs.id"))
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    # TODO habit+program should be unique

    icon = db.relationship("Icon", backref="habits")
    color = db.relationship("Color", backref="habits")
    program = db.relationship("Program", back_populates="habits")
    creator = db.relationship("User", back_populates="created_habits")
    stamps = db.relationship("Stamp", 
        back_populates="habit", 
        order_by="Stamp.date",
        cascade="all, delete-orphan")

    def to_dict(self):
        """Return dict of Habit"""
        return {
            "id": self.id,
            "title": self.habit,
            "description": self.description,
            "frequency": self.frequency,
            "color": self.color.hex,
            "icon": self.icon.title,
            "program_id": self.program_id,
            "created_at": self.created_at,
            "stamp_ids": [s.id for s in self.stamps],
        }