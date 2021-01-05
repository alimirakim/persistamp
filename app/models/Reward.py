from .db import db
from datetime import datetime


class Reward(db.Model):
    __tablename__ = "rewards"
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False) # enum?
    reward = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250))
    cost = db.Column(db.Integer, nullable=False, default=7)
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), default=1)
    limit_per_member = db.Column(db.Integer, nullable=False, default=1)
    quantity = db.Column(db.Integer, nullable=False, default=-1)
    stamp_id = db.Column(db.Integer, db.ForeignKey("stamps.id"), nullable=False, default=4)
    program_id = db.Column(db.Integer, db.ForeignKey("programs.id"))
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    # TODO program+ reward should be unique

    stamp = db.relationship("Stamp", back_populates="rewards")
    color = db.relationship("Color", back_populates="rewards")
    program = db.relationship("Program", back_populates="rewards")
    creator = db.relationship("User", back_populates="created_rewards")
    redeemed = db.relationship("Redeemed", back_populates="reward")
