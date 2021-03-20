from .db import db


class Icon(db.Model):
    __tablename__ = "icons"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False, unique=True)
    type = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        """Return dict of stamp"""
        return {
            "id": self.id,
            "title": self.title,
            "type": self.type,
        }