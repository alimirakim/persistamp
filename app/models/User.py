from sqlalchemy.dialects.postgresql import ARRAY
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    first_name = db.Column(db.String(25), nullable=False)
    last_name = db.Column(db.String(25))
    email = db.Column(db.String(320), nullable=False, unique=True)
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), default=1)
    icon_id = db.Column(db.Integer, db.ForeignKey("icons.id"), nullable=False, default=1)
    birthday = db.Column(db.Date)
    hashed_password = db.Column(db.String(255), nullable=False)
    private = db.Column(db.Boolean, nullable=False, default=False)
    program_ids_order = db.Column(ARRAY(db.Integer), nullable=False, default=[])
    reward_ids_order = db.Column(ARRAY(db.Integer), nullable=False, default=[])
    points = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    icon = db.relationship("Icon", backref="users")
    color = db.relationship("Color", backref="users")
    # programs = db.relationship("Program", secondary="Membership", foreign_keys="[Membership.member_id]", back_populates="users")
    memberships = db.relationship("Membership", foreign_keys="[Membership.member_id]", back_populates="member")
    stampers = db.relationship("Membership", foreign_keys="[Membership.stamper_id]", back_populates="stamper")
    receipts = db.relationship("Receipt", back_populates="user")
    # bonds1 = db.relationship("Bond", foreign_keys="[Bond.user1_id, Bond.user2_id]", back_populates=["bonded_user1", "bonded_user2"])
    bonds = db.relationship("Bond", foreign_keys="[Bond.user2_id]", back_populates="bond")
    created_programs = db.relationship("Program", back_populates="creator")
    created_activities = db.relationship("Activity", back_populates="creator")
    created_rewards = db.relationship("Reward", back_populates="creator")

    @property
    def password(self):
      return self.hashed_password

    @password.setter
    def password(self, password):
      self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
      return check_password_hash(self.password, password)

    def to_dict(self):
        """Return a dictionary of all user data"""
        program_ids = []
        activity_ids = []
        stamp_ids = []
        for membership in self.memberships:
            program_ids.append(membership.program_id)
            for activity in membership.program.activities:
                activity_ids.append(activity.id)
                for stamp in activity.stamps:
                    stamp_ids.append(stamp.id)

        birthday = None
        if self.birthday:
            birthday = self.birthday.strftime('%Y-%m-%d')

        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "birthday": birthday,
            "cid": self.color_id,
            "iid": self.icon_id,
            "pids": program_ids,
            "rec_ids": [r.id for r in self.receipts],
            "private": self.private,
            "pids_order": self.program_ids_order,
            "points": self.points,
        }
