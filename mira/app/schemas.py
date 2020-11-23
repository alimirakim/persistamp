from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models import User, Program, Habit, DailyStamp, Member, Reward, Redeemed, Bond


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


class HabitSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Habit
        include_relationships = True
        load_instance = True
habit_schema = HabitSchema()


class DailyStampSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = DailyStamp
        include_relationships = True
        load_instance = True
dailystamp_schema = DailyStampSchema()


class MemberSchema(SQLAlchemyAutoSchema):
    class Meta: 
        model = Member
        include_relationships = True
        load_instance = True
member_schema = MemberSchema()


class RewardSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Reward
        include_relationships = True
        load_instance = True
reward_schema = RewardSchema()


class RedeemedSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Redeemed
        include_relationships = True
        load_instance = True
redeemed_schema = RedeemedSchema()


class BondSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Bond
        include_relationships = True
        load_instance = True
bond_schema = BondSchema()
