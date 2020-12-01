from sqlalchemy.orm import joinedload
from app.schemas import user_schema, color_schema, stamp_schema, member_schema
from app.models import User


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