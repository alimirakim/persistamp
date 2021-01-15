from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(50), nullable=False, unique=True)
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), default=1)
    icon_id = db.Column(db.Integer, db.ForeignKey("icons.id"), nullable=False, default=1)
    birthday = db.Column(db.Date)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    icon = db.relationship("Icon", backref="users")
    color = db.relationship("Color", backref="users")
    # programs = db.relationship("Program", secondary="Membership", foreign_keys="[Membership.member_id]", back_populates="users")
    memberships = db.relationship("Membership", foreign_keys="[Membership.member_id]", back_populates="member")
    stampers = db.relationship("Membership", foreign_keys="[Membership.stamper_id]", back_populates="stamper")
    redeemed = db.relationship("Redeemed", back_populates="user")
    # bonds1 = db.relationship("Bond", foreign_keys="[Bond.user1_id, Bond.user2_id]", back_populates=["bonded_user1", "bonded_user2"])
    bonds = db.relationship("Bond", foreign_keys="[Bond.user2_id]", back_populates="bond")
    created_programs = db.relationship("Program", back_populates="creator")
    created_habits = db.relationship("Habit", back_populates="creator")
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
        habit_ids = []
        stamp_ids = []
        for membership in self.memberships:
            program_ids.append(membership.program_id)
            for habit in membership.program.habits:
                habit_ids.append(habit.id)
                for stamp in habit.stamps:
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
            # "membership_ids": [m.id for m in self.memberships],
            # "memberships": {m.id:m.to_dict() for m in self.memberships},
            "red_ids": [r.id for r in self.redeemed],
        }
