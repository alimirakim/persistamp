from .db import db


class Stamp(db.Model):
    __tablename__ = "stamps"
    id = db.Column(db.Integer, primary_key=True)
    stamp = db.Column(db.String(50), nullable=False, unique=True)
    type = db.Column(db.String(50), nullable=False)

    users = db.relationship("User", back_populates="stamp")
    programs = db.relationship("Program", back_populates="stamp")
    habits = db.relationship("Habit", back_populates="stamp")
    rewards = db.relationship("Reward", back_populates="stamp")

    # def to_dict(self):
    #   return {
    #     "stamp": self.stamp
    #   }