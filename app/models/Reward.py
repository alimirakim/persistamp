from .db import db
from datetime import datetime


class Reward(db.Model):
    __tablename__ = "rewards"
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False) # enum?
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250))
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), default=1)
    icon_id = db.Column(db.Integer, db.ForeignKey("icons.id"), nullable=False, default=4)
    cost = db.Column(db.Integer, nullable=False, default=7)
    quantity = db.Column(db.Integer, nullable=False, default=-1)
    limit_per_member = db.Column(db.Integer, default=-1)
    program_id = db.Column(db.Integer, db.ForeignKey("programs.id"))
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    # TODO program+ reward should be unique

    icon = db.relationship("Icon", backref="rewards")
    color = db.relationship("Color", backref="rewards")
    program = db.relationship("Program", back_populates="rewards")
    creator = db.relationship("User", back_populates="created_rewards")
    receipts = db.relationship("Receipt", order_by="Receipt.created_at", back_populates="reward")

    def to_dict(self):
        """Return dict of Reward"""
        return {
          "id": self.id,
          "title": self.title,
          "description": self.description,
          "cid": self.color_id,
          "iid": self.icon_id,
          "pid": self.program_id,
          "cost": self.cost,
          "limit_per_member": self.limit_per_member,
          "quantity": self.quantity,
          "type": self.type,
          "created_at": self.created_at, 
          "receipts_count": len(self.receipts),
          "last_created_at": (lambda: self.receipts[-1].created_at if self.receipts[-1:] else "")(),
        }
