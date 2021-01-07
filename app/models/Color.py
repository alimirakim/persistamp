from .db import db


class Color(db.Model):
    __tablename__ = "colors"
    id = db.Column(db.Integer, primary_key=True)
    hex = db.Column(db.String(7), nullable=False, unique=True)
    title = db.Column(db.String(50), unique=True)
    mode = db.Column(db.String(50), default="dark")

    def to_dict(self):
        """Return dict of color"""
        return {
          "id": self.id,
          "hex": self.hex,
          "title": self.title,
          "mode": self.mode,
        }