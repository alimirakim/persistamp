from .db import db
from datetime import datetime


class Receipt(db.Model):
    __tablename__ = "receipts"
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250))
    value = db.Column(db.Integer, default=1)
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), nullable=False)
    icon_id = db.Column(db.Integer, db.ForeignKey("icons.id"), nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey("activities.id"))
    reward_id = db.Column(db.Integer, db.ForeignKey("rewards.id"))
    program_id = db.Column(db.Integer, db.ForeignKey("programs.id"))

    user = db.relationship("User", back_populates="receipts")
    color = db.relationship("Color", backref="receipts")
    icon = db.relationship("Icon", backref="receipts")
    activity = db.relationship("Activity", backref="receipts")
    reward = db.relationship("Reward", back_populates="receipts")
    program = db.relationship("Program", backref="receipts")
    
    def to_dict(self):
        """Return dict of Receipt"""
        return {
            "id": self.id,
            "uid": self.user_id,
            "rew_id": self.reward_id,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M"),
            "title": self.title,
            "description": self.description,
            "cid": self.color_id,
            "iid": self.icon_id,
            "pid": self.program_id,
            "cost": self.value,
        }