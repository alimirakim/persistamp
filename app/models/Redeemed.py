from .db import db
from datetime import datetime


class Redeemed(db.Model):
    __tablename__ = "redeemed"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    reward_id = db.Column(db.Integer, db.ForeignKey("rewards.id"))
    redeemed_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250))
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), default=1)
    icon_id = db.Column(db.Integer, db.ForeignKey("icons.id"), nullable=False, default=4)
    cost = db.Column(db.Integer, nullable=False, default=7)
    program_id = db.Column(db.Integer, db.ForeignKey("programs.id"))

    user = db.relationship("User", back_populates="redeemed")
    reward = db.relationship("Reward", back_populates="redeemed")
    
    def to_dict(self):
        """Return dict of Redeemed"""
        return {
            "id": self.id,
            "uid": self.user_id,
            "rew_id": self.reward_id,
            "redeemed_at": self.redeemed_at.strftime("%Y-%m-%d %H:%M"),
            "title": self.title,
            "description": self.description,
            "cid": self.color_id,
            "iid": self.icon_id,
            "pid": self.program_id,
            "cost": self.cost,
        }