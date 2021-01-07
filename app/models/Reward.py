from .db import db
from datetime import datetime


class Reward(db.Model):
    __tablename__ = "rewards"
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False) # enum?
    description = db.Column(db.String(250))
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), default=1)
    icon_id = db.Column(db.Integer, db.ForeignKey("icons.id"), nullable=False, default=4)
    cost = db.Column(db.Integer, nullable=False, default=7)
    limit_per_member = db.Column(db.Integer, nullable=False, default=1)
    quantity = db.Column(db.Integer, nullable=False, default=-1)
    title = db.Column(db.String(50), nullable=False)
    program_id = db.Column(db.Integer, db.ForeignKey("programs.id"))
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    # TODO program+ reward should be unique

    icon = db.relationship("Icon", backref="rewards")
    color = db.relationship("Color", backref="rewards")
    program = db.relationship("Program", back_populates="rewards")
    creator = db.relationship("User", back_populates="created_rewards")
    redeemed = db.relationship("Redeemed", back_populates="reward")

    def to_dict(self):
        """Return dict of Reward"""
        return {
          "id": self.id,
          "title": self.title,
          "description": self.description,
          "color": self.color.hex,
          "icon": self.icon.title,
          "program_id": self.program_id,
          "cost": self.cost,
          "limit_per_member": self.limit_per_member,
          "quantity": self.quantity,
          "type": self.type, 
        }
