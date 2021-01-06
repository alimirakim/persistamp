from flask import jsonify
from sqlalchemy.orm import joinedload
from app.schemas import user_schema, color_schema, stamp_schema, membership_schema, program_schema, habit_schema, dailystamp_schema, reward_schema, redeemed_schema
from app.models import User, Reward, Redeemed, Membership, Program
from datetime import date, timedelta


def dump_data_list(instances, schema):
    """Deserialize a list of model instances into jsonify-able objects."""
    data = []
    for instance in instances:
        # print("instance", instance)
        data.append(schema.dump(instance))
    # print("\nDUMPING data list", data)
    return data


def queryUserFullData(id):
    """
    Query for user by id and return jsonifiable object including data for: 
    color, stamp, memberships object (key ids, value objects).
    """
    user = User.query.options( \
        joinedload(User.color), \
        joinedload(User.stamp), \
        joinedload(User.memberships) \
        .joinedload(Membership.program) \
        .joinedload(Program.habits), \
        ).get(id)
    
    memberships = {}
    programs = {}
    habits = {}
    daily_stamps = {}
    
    for membership in user.memberships:
        memberships[membership.id] = membership_schema.dump(membership)
        programs[membership.program_id] = program_schema.dump(membership.program)
        for habit in membership.program.habits:
            habits[habit.id] = habit_schema.dump(habit)
            for ds in habit.daily_stamps:
                daily_stamps[ds.id] = dailystamp_schema.dump(ds)
    
    user_data = user_schema.dump(user)
    user_data["color"] = color_schema.dump(user.color)
    user_data["stamp"] = stamp_schema.dump(user.stamp)
    user_data["memberships"] = memberships
    user_data["program_ids"] = tuple(programs.keys())
    user_data["habit_ids"] = tuple(habits.keys())
    user_data["daily_stamp_ids"] = tuple(daily_stamps.keys())
    # user_data["redeemed_ids"] = redeemed_schema.dump(user.???)
    print("\nUSER DATA", user_data)
    
    return jsonify(
        memberships_data=memberships, 
        programs_data=programs, 
        habits_data=habits, 
        daily_stamps_data=daily_stamps, 
        user_data=user_data,
        past_week=get_past_week())


def get_past_week():
    """Return the past week in datetime data"""
    current_date = date.today()
    past_week = [(current_date - timedelta(days=i)) for i in range(7)]
    return [(day.strftime('%A')[0:3], day.strftime('%Y-%m-%d')) for day in past_week]



def dumpProgramFullData(program):
    """Dump jsonifyable data for a program include details on color, stamp, creator."""
    program_data = program_schema.dump(program)
    program_data["color"] = color_schema.dump(program.color)
    program_data["stamp"] = stamp_schema.dump(program.stamp)
    program_data["creator"] = user_schema.dump(program.creator)
    ("\n\nPROGRAM DUMP", program_data)
    return program_data
    

def dumpRewardFullData(reward):
    """Dump full details of a queried reward."""
    reward_data = reward_schema.dump(reward)
    reward_data["color"] = color_schema.dump(reward.color) 
    reward_data["stamp"] = stamp_schema.dump(reward.stamp)
    reward_data["creator"] = user_schema.dump(reward.creator)
    reward_data["program"] = program_schema.dump(reward.program)
    return reward_data


def dumpRedeemedData(redeemed_data, reward):
    """Dump reward details into a redeemed reward."""
    print("\n\ndumped redeem/reward", redeemed_data, reward)
    redeemed_data["reward"] = reward_schema.dump(reward)
    redeemed_data["reward"]["color"] = color_schema.dump(reward.color)
    redeemed_data["reward"]["stamp"] = stamp_schema.dump(reward.stamp)
    return redeemed_data


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages