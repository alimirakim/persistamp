from .db import db
from datetime import datetime


class Bond(db.Model):
    __tablename__ = "bonds"
    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    bond = db.relationship("User", foreign_keys=[user2_id], back_populates="bonds")

    def to_dict(self):
        """Return dict of Bond"""
        return {
          "id": self.id,
          "bonded_user_id": self.user2_id,
          "created_at": self.created_at,
        }