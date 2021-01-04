from sqlalchemy.orm import joinedload
from app.schemas import user_schema, color_schema, stamp_schema, member_schema, program_schema, reward_schema, redeemed_schema
from app.models import User, Reward, Redeemed, Member, Program


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
        joinedload(User.memberships), \
        ).get(id)
        
    user_data = user_schema.dump(user)
    user_data["color"] = color_schema.dump(user.color)
    user_data["stamp"] = stamp_schema.dump(user.stamp)
    user_data["memberships"] = {m["id"]:m for m in dump_data_list(user.memberships, member_schema)}
    print("\nqueried user memberships", user.memberships, user_data["memberships"])
    return user_data


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
