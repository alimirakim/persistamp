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

bonds = db.Table( # combined unique constraint
    "bonds",
    db.Column("id", db.Integer, primary_key=True),
    db.Column("user1_id", db.Integer, db.ForeignKey("users.id"), nullable=False),
    db.Column("user2_id", db.Integer, db.ForeignKey("users.id"), nullable=False),
    db.Column("created_at", db.DateTime, default=datetime.now()),
)

redeemed = db.Table(
    "redeemed",
    db.Column("id", db.Integer, primary_key=True),
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), nullable=False),
    db.Column("reward_id", db.Integer, db.ForeignKey("rewards.id"), nullable=False),
    db.Column("redeemed_at", db.DateTime, nullable=False, default=datetime.now())
)


class Stamp(db.Model):
    __tablename__ = "stamps"
    id = db.Column(db.Integer, primary_key=True)
    stamp = db.Column(db.String(50), nullable=False, unique=True)
    type = db.Column(db.String(50), nullable=False)

    users = db.relationship("User", back_populates="stamp")
    programs = db.relationship("Program", back_populates="stamp")
    habits = db.relationship("Habit", back_populates="stamp")
    rewards = db.relationship("Reward", back_populates="stamp")


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(50), nullable=False, unique=True)
    color = db.Column(db.String(7), nullable=False, default=default_color)
    stamp_id = db.Column(db.Integer, db.ForeignKey("stamps.id"), nullable=False, default=default_stamps["user"])
    birthday = db.Column(db.Date)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    stamp = db.relationship("Stamp", back_populates="users")
    created_programs = db.relationship("Program", back_populates="creator")
    created_habits = db.relationship("Habit", back_populates="creator")
    created_rewards = db.relationship("Reward", back_populates="creator")
    members = db.relationship("Member", back_populates="member")
    stampers = db.relationship("Member", back_populates="stamper")
    redeemed = db.relationship("Reward", secondary=redeemed, back_populates="redeemed")
    bonds = db.relationship("Bond", secondary=bonds, back_populates="bonds")

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
      "email": self.email
    }
