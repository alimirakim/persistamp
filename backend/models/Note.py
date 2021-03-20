from .db import db
from datetime import datetime


class Note(db.Model):
    """Represents a communication of some type between two users."""
    __tablename__ = "notes"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(25))
    description = db.Column(db.String(250))
    type = db.Column(db.String(50), default="message") # friend request, stamp buddy request, message, emoji
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    sender = db.relationship("User", foreign_keys=[sender_id], backref="sender")
    recipient = db.relationship("User", foreign_keys=[recipient_id], backref="recipients")
