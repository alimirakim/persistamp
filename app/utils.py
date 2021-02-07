from flask import jsonify
from sqlalchemy.orm import joinedload
# from app.schemas import user_schema, color_schema, icon_schema, membership_schema, program_schema, activity_schema, stamp_schema, reward_schema, redeemed_schema
from app.models import User, Reward, Receipt, Membership, Program
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


def queryUserFullData(uid):
    """
    Query for user by id and return jsonifiable object including data for: 
    color, stamp, memberships object (key ids, value objects).
    """
    user = User.query.options( \
        joinedload(User.memberships) \
        .joinedload(Membership.program) \
        .joinedload(Program.activities), \
        ).get(uid)
    
    programs = {}
    activities = {}
    stamps = {}
    
    for membership in user.memberships:
        programs[membership.program_id] = membership.program.to_dict_for_user(uid)
        for activity in membership.program.activities:
            activities[activity.id] = activity.to_dict_for_user(user)
            for stamp in activity.stamps:
                if stamp.membership_id == membership.id:
                    stamps[stamp.id] = stamp.to_dict()

    print("\nuser data?")
    # pprint(programs)
    # pprint(activities)
    # pprint(stamps)
    return jsonify(
        programs_data=programs, 
        activities_data=activities, 
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


# def dumpReceiptData(redeemed_data, reward):
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
    "american-sign-language-interpreting",
    "assistive-listening-systems",
    "baby",
    "chalkboard-teacher",
    "child",
    "deaf",
    "female",
    "wheelchair",
    "fist-raised",
    "user",
    "user-astronaut",
    "user-clock",
    "user-cog",
    "user-edit",
    "user-friends",
    "user-graduate",
    "user-injured",
    "user-lock",
    "user-md",
    "user-ninja",
    "user-nurse",
    "users",
    "user-secret",
    "user-shield",
    "user-tie",
    "male",
      "meteor",
      "icicles",
    "fire",
    "leaf",
    "cannabis",
    "tree",
    "seedling",
    "bacteria",
    "bacterium",
    "bug",
    "cat",
    "crow",
    "disease",
    "dog",
    "dove",
    "dragon",
    "fish",
    "frog",
    "ghost",
    "hippo",
    "spider",
    "robot",
    "paw",
    "otter",
    "kiwi-bird",
    "holly-berry",
    "horse",
      "bacon",
      "beer",
    "birthday-cake",
    "bread-slice",
    "candy-cane",
    "carrot",
    "cheese",
    "cocktail",
    "coffee",
    "cookie",
    "cookie-bite",
    "drumstick-bite",
    "egg ",
    "glass-cheers",
    "glass-martini-alt",
    "glass-whiskey",
    "lemon",
    "pizza-slice",
    "utensils",
    "wine-bottle",
    "pepper-hot",
    "mug-hot",
    "hotdog",
    "hamburger",
    "ice-cream",
    "home",
    "archway",
    "building",
    "broadcast-tower",
    "campground",
    "church",
    "city",
    "clinic-medical",
    "door-closed",
    "door-open",
    "dungeon",
    "gopuram",
    "torii-gate",
    "umbrella-beach",
    "university",
    "school",
    "road",
    "restroom",
    "person-booth",
    "hospital",
    "hospital-alt",
    "hotel",
    "house-damage",
    "igloo",
    "industry",
    "place-of-worship",
    "landmark",
    "swimming-pool",
    "synagogue",
    "vihara",
    "warehouse",
    "mosque",
    "monument",
    "mountain",
    "shoe-prints",
      "ambulance",
      "bicycle",
    "bus",
    "bus-alt",
    "car",
    "car-alt",
    "caravan",
    "car-crash",
    "car-side",
    "fighter-jet",
    "taxi",
    "traffic-light",
    "train",
    "tram",
    "truck",
    "truck-loading",
    "truck-monster",
    "truck-pickup",
    "plane",
    "sleigh",
    "space-shuttle",
    "ship",
    "shuttle-van",
    "rocket",
    "motorcycle",
    "helicopter",
      "band-aid",
      "brain",
    "capsules",
    "diagnoses",
    "eye",
    "book-medical",
    "book-dead",
    "file-medical",
    "file-medical-alt",
    "first-aid",
    "thermometer",
    "hand-sparkles",
    "hands-wash",
    "tooth",
    "virus",
    "viruses",
    "virus-slash",
    "x-ray",
    "stethoscope",
    "syringe",
    "skull",
    "tablets",
    "skull-crossbones",
    "smoking",
    "smoking-ban",
    "soap",
    "pills",
    "prescription-bottle",
    "prescription-bottle-alt",
    "medkit",
    "lungs",
    "lungs-virus",
    "head-side-cough",
    "head-side-virus",
    "briefcase-medical",
    "satellite",
    "satellite-dish",
    "sim-card",
    "microscope",
    "solar-panel",
    "microphone-alt",
    "mobile-alt",
    "mouse-pointer",
    "laptop",
    "lightbulb",
    "atom",
    "blender",
    "compact-disc",
    "database",
    "desktop",
    "mouse",
    "keyboard",
    "camera",
    "gamepad",
    "save",
    "tv",
    "film",
    "calculator",
    "eraser",
    "id-card",
    "link",
    "life-ring",
    "magnet",
    "map-pin",
    "medal",
    "map",
    "oil-can",
    "newspaper",
    "music",
    "quran",
    "stamp",
    "tint",
    "ticket-alt",
    "thumbtack",
    "toolbox",
    "trophy",
    "unlock",
    "address-book",
    "address-card",
    "anchor",
    "air-freshener",
    "archive",
    "atlas",
    "award",
    "balance-scale",
    "balance-scale-left",
    "balance-scale-right",
    "bell",
    "bible",
    "bomb",
    "bone",
    "bong",
    "book-open",
    "box",
    "boxes",
    "box-open",
    "box-tissue",
    "briefcase",
    "bullseye",
    "burn",
    "clipboard-list",
    "cog",
    "cogs",
    "file-alt",
    "file-contract",
    "file-invoice",
    "file-invoice-dollar",
    "file-signature",
    "fire-alt",
    "flag",
    "flask",
    "folder",
    "folder-open",
    "gas-pump",
    "gem",
    "gift",
    "gifts",
    "wind",
    "poop",
    "image",
      "crown",
      "glasses",
    "graduation-cap",
    "hard-hat",
    "hat-cowboy",
    "hat-wizard",
    "headphones",
    "headset",
    "head-side-mask",
    "tshirt",
    "socks",
    "mask",
    "mitten",
      "comment",
      "comment-alt",
    "comment-dollar",
    "comment-dots",
    "comment-medical",
    "comments",
    "comments-dollar",
    "comment-slash",
    "envelope",
    "envelope-open",
    "envelope-open-text",
    "envelope-square",
    "fax",
    "vial",
    "vials",
    "video",
    "sms",
    "braille",
    "sign-language",
    "phone",
    "mail-bulk",
    "hands-helping",
    "handshake",
    "hand-holding",
    "hand-holding-heart",
    "hand-holding-medical",
    "hand-holding-usd",
    "hand-holding-water",
    "hand-peace",
    "hand-paper",
    "hand-rock",
    "hand-scissors",
    "hand-middle-finger",
    "hand-pointer",
      "baby-carriage",
      "bath",
    "bed",
    "chair",
    "chalkboard",
    "couch",
    "faucet",
    "sink",
    "shower",
    "hot-tub",
    "toilet",
    "toilet-paper",
    "trash",
    "trash-alt",
      "cart-plus",
      "cash-register",
    "coins",
    "credit-card",
    "donate",
    "store",
    "store-alt",
    "wallet",
    "shopping-basket",
    "shopping-cart",
    "piggy-bank",
    "money-check",
    "money-check-alt",
    "money-bill-wave",
    "dollar-sign",
    "euro-sign",
    "yen-sign",
    "won-sign",
    "ruble-sign",
    "rupee-sign",
      "concierge-bell",
      "compass",
    "dice",
    "dice-d20",
    "fire-extinguisher",
    "fan",
    "feather",
    "bowling-ball",
    "key",
    "marker",
    "highlighter",
    "broom",
    "binoculars",
    "bullhorn",
    "crutch",
    "cut",
    "drafting-compass",
    "gavel",
    "guitar",
    "hammer",
    "umbrella",
    "wrench",
    "shield-alt",
    "search",
    "screwdriver",
    "pen",
    "pen-alt",
    "pen-fancy",
    "ruler",
    "brush",
    "paint-roller",
    "paint-brush",
    "palette",
    "mortar-pestle",
    "magic",
      "dumbbell",
      "football-ball",
    "futbol",
    "baseball-ball",
    "volleyball-ball",
    "basketball-ball",
    "biking",
    "blind",
    "book-reader",
    "chess",
    "golf-ball",
    "hockey-puck",
    "walking",
    "swimmer",
    "skating",
    "skiing",
    "snowboarding",
    "running",
    "table-tennis",
    "pray",
    "hiking",
    "praying-hands",
      "history",
      "calendar",
    "calendar-alt",
    "calendar-check",
    "calendar-times",
    "clock",
    "hourglass",
    "hourglass-end",
    "hourglass-half",
    "hourglass-start",
    "bolt",
    "cloud",
    "cloud-moon",
    "cloud-moon-rain",
    "cloud-rain ",
    "cloud-showers-heavy",
    "cloud-sun",
    "cloud-sun-rain",
    "stopwatch",
    "sun",
    "snowman",
    "smog",
    "moon",
    "star-and-crescent",
    "thermometer-empty",
    "thermometer-full",
    "thermometer-half",
    "snowflake",
    "directions",
    "random",
    "retweet",
    "redo",
    "reply",
    "route",
      "signal",
      "spa",
    "adjust",
    "ankh",
    "asterisk",
    "at",
    "ban",
    "battery-empty",
    "battery-full",
    "battery-half",
    "biohazard",
    "bookmark",
    "border-all",
    "certificate",
    "check",
    "check-circle",
    "check-double",
    "chess-bishop",
    "chess-king",
    "chess-knight",
    "chess-pawn",
    "chess-queen",
    "chess-rook",
    "circle",
    "code",
    "code-branch",
    "cube",
    "cross",
    "crosshairs",
    "dharmachakra",
    "divide",
    "dna",
    "eye-slash",
    "filter",
    "fingerprint",
    "font",
    "globe",
    "globe-africa",
    "globe-americas",
    "globe-asia",
    "globe-europe",
    "star",
    "signature",
    "thumbs-up",
    "thumbs-down",
    "shapes",
    "recycle",
    "heart",
    "heart-broken",
    "infinity",
    "icons",
    "info",
    "info-circle",
    "exclamation",
    "exclamation-circle",
    "exclamation-triangle",
    "question",
    "question-circle",
      "angry",
      "dizzy",
    "flushed",
    "frown",
    "frown-open",
    "grimace",
    "grin",
    "grin-alt",
    "grin-beam",
    "grin-beam-sweat",
    "grin-hearts",
    "grin-squint",
    "grin-squint-tears",
    "grin-stars",
    "grin-tongue",
    "grin-wink",
    "sad-cry",
    "sad-tear",
]
