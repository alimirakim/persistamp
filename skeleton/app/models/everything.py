from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


default_color = "#000"
default_stamps = {
  "user": 1, #"user-circle"
  "program": 2, #"calendar-alt"
  "habit": 3, #"check-circle"
  "reward": 4, #"award"
}


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


class Color(db.Model):
    __tablename__ = "colors"
    id = db.Column(db.Integer, primary_key=True)
    hex = db.Column(db.String(7), nullable=False, unique=True)
    name = db.Column(db.String(50), unique=True)
    mode = db.Column(db.String(50), default="night")

    users = db.relationship("User", back_populates="color")
    programs = db.relationship("Program", back_populates="color")
    habits = db.relationship("Habit", back_populates="color")
    rewards = db.relationship("Reward", back_populates="color")


class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(50), nullable=False, unique=True)
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), default=1)
    stamp_id = db.Column(db.Integer, db.ForeignKey("stamps.id"), nullable=False, default=default_stamps["user"])
    birthday = db.Column(db.Date)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    stamp = db.relationship("Stamp", back_populates="users")
    color = db.relationship("Color", back_populates="users")
    # programs = db.relationship("Program", secondary="Member", foreign_keys="[Member.member_id]", back_populates="users")
    memberships = db.relationship("Member", foreign_keys="[Member.member_id]", back_populates="member")
    stampers = db.relationship("Member", foreign_keys="[Member.stamper_id]", back_populates="stamper")
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
      return {
        "id": self.id,
        "username": self.username,
        "email": self.email,
        "first_name": self.first_name,
        "last_name": self.last_name,
        "birthday": self.birthday,
        "color_id": self.color_id,
        "stamp_id": self.stamp_id
      }


class Program(db.Model):
    __tablename__ = "programs"
    id = db.Column(db.Integer, primary_key=True)
    program = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250))
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), default=1)
    stamp_id = db.Column(db.Integer, db.ForeignKey("stamps.id"), nullable=False, default=default_stamps["program"])
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    stamp = db.relationship("Stamp", back_populates="programs")
    color = db.relationship("Color", back_populates="programs")
    members = db.relationship("Member", back_populates="program", cascade="all, delete-orphan")
    habits = db.relationship("Habit", back_populates="program", cascade="all, delete-orphan")
    rewards = db.relationship("Reward", back_populates="program")#, cascade="all, delete-orphan")
    creator = db.relationship("User", back_populates="created_programs")


class Member(db.Model):
    __tablename__ = "members"
    id = db.Column(db.Integer, primary_key=True)
    program_id = db.Column(db.Integer, db.ForeignKey("programs.id"), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    stamper_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    points = db.Column(db.Integer, nullable=False, default=0)
    joined_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    # TODO Program+member should be unique

    program = db.relationship("Program", back_populates="members")
    member = db.relationship("User", foreign_keys=[member_id], back_populates="memberships")
    stamper = db.relationship("User", foreign_keys=[stamper_id], back_populates="stampers")
    daily_stamps = db.relationship("DailyStamp", back_populates="member")


class Habit(db.Model):
    __tablename__ = "habits"
    id = db.Column(db.Integer, primary_key=True)
    habit = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250))
    frequency = db.Column(db.String(7), nullable=False, default="7")
    color_id = db.Column(db.Integer, db.ForeignKey("colors.id"), default=1)
    stamp_id = db.Column(db.Integer, db.ForeignKey("stamps.id"), nullable=False, default=default_stamps["habit"])
    program_id = db.Column(db.Integer, db.ForeignKey("programs.id"))
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    # TODO habit+program should be unique

    stamp = db.relationship("Stamp", back_populates="habits")
    color = db.relationship("Color", back_populates="habits")
    program = db.relationship("Program", back_populates="habits")
    creator = db.relationship("User", back_populates="created_habits")
    daily_stamps = db.relationship("DailyStamp", back_populates="habit", cascade="all, delete-orphan")

    def to_dict(self):
      return {
        "id": self.id
      }


class DailyStamp(db.Model):
    __tablename__ = "daily_stamps"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=datetime.today())
    status = db.Column(db.Enum('unstamped', 'pending', 'stamped', name="status"))
    habit_id = db.Column(db.Integer, db.ForeignKey("habits.id"), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey("members.id"), nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    habit = db.relationship("Habit", back_populates="daily_stamps")
    member = db.relationship("Member", back_populates="daily_stamps")


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
    stamp_id = db.Column(db.Integer, db.ForeignKey("stamps.id"), nullable=False, default=default_stamps["reward"])
    program_id = db.Column(db.Integer, db.ForeignKey("programs.id"))
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    # TODO program+ reward should be unique

    stamp = db.relationship("Stamp", back_populates="rewards")
    color = db.relationship("Color", back_populates="rewards")
    program = db.relationship("Program", back_populates="rewards")
    creator = db.relationship("User", back_populates="created_rewards")
    redeemed = db.relationship("Redeemed", back_populates="reward")


class Redeemed(db.Model):
    __tablename__ = "redeemed"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    reward_id = db.Column(db.Integer, db.ForeignKey("rewards.id"), nullable=False)
    redeemed_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="redeemed")
    reward = db.relationship("Reward", back_populates="redeemed")


class Bond(db.Model):
    __tablename__ = "bonds"
    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    bond = db.relationship("User", foreign_keys=[user2_id], back_populates="bonds")
