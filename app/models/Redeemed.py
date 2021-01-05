from .db import db
from datetime import datetime


class Redeemed(db.Model):
    __tablename__ = "redeemed"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    reward_id = db.Column(db.Integer, db.ForeignKey("rewards.id"), nullable=False)
    redeemed_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="redeemed")
    reward = db.relationship("Reward", back_populates="redeemed")