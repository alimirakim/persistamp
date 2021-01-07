from flask import jsonify
from sqlalchemy.orm import joinedload
# from app.schemas import user_schema, color_schema, icon_schema, membership_schema, program_schema, habit_schema, stamp_schema, reward_schema, redeemed_schema
from app.models import User, Reward, Redeemed, Membership, Program
from datetime import date, timedelta
from pprint import pprint


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
        joinedload(User.memberships) \
        .joinedload(Membership.program) \
        .joinedload(Program.habits), \
        ).get(id)
    
    memberships = {}
    programs = {}
    habits = {}
    stamps = {}
    
    for membership in user.memberships:
        memberships[membership.id] = membership.to_dict()
        programs[membership.program_id] = membership.program.to_dict()
        for habit in membership.program.habits:
            habits[habit.id] = habit.to_dict()
            for stamp in habit.stamps:
                stamps[stamp.id] = stamp.to_dict()

    print("\nhabits?")
    pprint(programs)
    return jsonify(
        memberships_data=memberships, 
        programs_data=programs, 
        habits_data=habits, 
        stamps_data=stamps, 
        user_data=user.to_dict(),
        past_week=get_past_week(),)


def get_past_week():
    """Return the past week in datetime data"""
    current_date = date.today()
    past_week = [(current_date - timedelta(days=i)) for i in range(7)]
    return [(day.strftime('%A')[0:3], day.strftime('%Y-%m-%d')) for day in past_week]


# def dumpProgramFullData(program):
#     """Dump jsonifyable data for a program include details on color, stamp, creator."""
#     program_data = program_schema.dump(program)
#     program_data["color"] = color_schema.dump(program.color)
#     program_data["stamp"] = stamp_schema.dump(program.stamp)
#     program_data["creator"] = user_schema.dump(program.creator)
#     ("\n\nPROGRAM DUMP", program_data)
#     return program_data
    

# def dumpRewardFullData(reward):
#     """Dump full details of a queried reward."""
#     reward_data = reward_schema.dump(reward)
#     reward_data["color"] = color_schema.dump(reward.color) 
#     reward_data["stamp"] = stamp_schema.dump(reward.stamp)
#     reward_data["creator"] = user_schema.dump(reward.creator)
#     reward_data["program"] = program_schema.dump(reward.program)
#     return reward_data


# def dumpRedeemedData(redeemed_data, reward):
#     """Dump reward details into a redeemed reward."""
#     print("\n\ndumped redeem/reward", redeemed_data, reward)
#     redeemed_data["reward"] = reward_schema.dump(reward)
#     redeemed_data["reward"]["color"] = color_schema.dump(reward.color)
#     redeemed_data["reward"]["stamp"] = stamp_schema.dump(reward.stamp)
#     return redeemed_data


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


colors = [
    "#ff5964", # 0
    "#d66ba0", # 1
    "#e87ea1", # 2
    "#dc9e82", # 3
    "#ebb3a9", # 4
    "#dcc48e", # 5
    "#f4e4ba", # 6
    "#f2f3d9", # 7
    "#c2d8b9", # 8
    "#b0f2b4", # 10
    "#9df7e5", # 
    "#b8f3ff", # 
    "#b49fcc", # 
    "#b07bac", # 14
    "#ffffff", # 
    "#a5243d", # 
    "#be5a38", # 16
    "#f29e4c", # 17
    "#f1c453", # 
    "#efea5a", # 
    "#b9e769", # 20
    "#83e377", # 
    "#16db93", # 
    "#0db39e", # 
    "#8ac6d0", # 
    "#58a4b0", # 25
    "#048ba8", # 
    "#2c699a", # 
    "#54478c", # 
    "#af4d98", # 29
    "#808080", # 
    "#000000", # 
]

icons = [
    "user-circle", "calendar-alt", "check-circle", "award", "cogs", 
    "clipboard-check", "medal", "heart", "star", "palette", "dice", "car-alt", 
    "chess-queen", "basketball-ball", "bowling-ball", "dumbbell", "guitar", 
    "key", "laptop", "pencil-alt", "pen-alt", "tooth", "biking", "dog", "cat", 
    "carrot", "cookie", "bacon", "ice-cream",
]