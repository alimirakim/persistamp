def dump_data_list(instances, schema):
    """Deserialize a list of model instances into jsonify-able objects."""
    data = []
    for instance in instances:
        data.append(schema.dump(instance))
    return data