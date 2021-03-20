# from sqlalchemy.orm import declared_attr
# from .db import db

# class Mixin(object):
#     """Mixin for shared columns between Program, Activity, Reward, Receipt."""

#     @declared_attr
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(25), nullable=False)
#     description = db.Column(db.String(250))
#     is_private = db.Column(db.Boolean, nullable=False, default=False)
#     updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
#     @declared_attr
#     def creator_id(cls):
#         """Creates creator id column with foreign ref key"""
#         return db.Column('creator_id', db.Integer, db.ForeignKey("users.id"), nullable=False)
#     @declared_attr
#     def creator(cls):
#         """Creates relationship to user that created the instance"""
#         return db.relationship("User")
#     @declared_attr 
#     def color_id(cls):
#         """"""
#         return db.Column(db.Integer, db.ForeignKey("colors.id"), nullable=False)
#     @declared_attr 
#     def color(cls):
#         """"""
#         return db.relationship("Color")
#     @declared_attr 
#     def icon_id(cls):
#         """"""
#         return db.relationship(db.Integer, db.ForeignKey("icons.id"), nullable=False)
#     @declared_attr 
#     def icon(cls):
#         """"""
#         return db.relationship("Icon")

#     def to_dict(self):
#         """Convert model object to dictionary."""
#         return {
#             "id": self.id,
#             "title": self.title,
#             "description": self.description,
#             "cid": self.color_id,
#             "iid": self.icon_id,
#             "is_private": self.is_private,
#             "updated_at": self.updated_at,
#             "created_at": self.created_at,
#             "creator_id": self.creator_id,
#         }
