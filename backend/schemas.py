from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow_sqlalchemy.fields import Nested
from app.models import User, Program, Activity, Stamp, Membership, Reward, Receipt, Bond, Icon, Color


# class SmartNested(Nested):
#     def serialize(self, attr, obj, accessor=None):
#         if attr not in obj.__dict__:
#             return {"id": int(getattr(obj, attr + "_id"))}
#         return super(SmartNested, self).serialize(attr, obj, accessor)

class ColorSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Color
        include_relationships = True
        load_instance = True
color_schema = ColorSchema()


class StampSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Stamp
        include_relationships = True
        load_instance = True
stamp_schema = StampSchema()


class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_relationships = True
        load_instance = True
user_schema = UserSchema()


class ProgramSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Program
        include_relationships = True
        load_instance = True
program_schema = ProgramSchema()


class ActivitySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Activity
        include_relationships = True
        load_instance = True
activity_schema = ActivitySchema()


class IconSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Icon
        include_relationships = True
        load_instance = True
icon_schema = IconSchema()


class MembershipSchema(SQLAlchemyAutoSchema):
    class Meta: 
        model = Membership
        include_relationships = True
        load_instance = True
membership_schema = MembershipSchema()


class RewardSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Reward
        include_relationships = True
        load_instance = True
reward_schema = RewardSchema()


class ReceiptSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Receipt
        include_relationships = True
        load_instance = True
receipt_schema = ReceiptSchema()


class BondSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Bond
        include_relationships = True
        load_instance = True
bond_schema = BondSchema()
