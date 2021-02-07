from app.models import User, Program, Activity, Color, Icon, Stamp, Membership, Reward
from app import app, db
from calendar import monthrange
from random import *
from datetime import date, timedelta, datetime
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    icon_sets = {
        "Nature": [
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
        ],
        "Food": [
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
        ],
        "Places": [
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
        ],
        "Transport": [
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
        ],
        "People": [
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
        ],
        "Health": [
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
        ],
        "Technology": [
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
        ],
        "Items": [
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
        ],
        "Clothing": [
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
        ],
        "Communication": [
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
        ],
        "Furniture": [
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
        ],
        "Commerce": [
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
        ],
        "Tools": [
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
        ],
        "Activities": [
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
        ],
        "Time & Weather": [
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
        ],
        "Symbols": [
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
        ],
        "Moods": [
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
    }

    icons = []
    for type, titles in icon_sets.items():
          [icons.append(Icon(type=type, title=title)) for title in titles]
    for icon in icons:
        db.session.add(icon)

    all_colors = {
        "white":              "#ffffff",
        "grey":               "#808080",
        "black":              "#000000",
        "vivid-burgundy":     "#a5243d",
        "fiery-rose":         "#ff5964",
        "antique-brass":      "#dc9e82",
        "melon":              "#ebb3a9",
        "cedar-chest":        "#be5a38",  # 16
        "sandy-brown":        "#f29e4c",  # 17
        "gold-crayola":       "#dcc48e",
        "maize-crayola":      "#f1c453",
        "corn":               "#efea5a",
        "dutch-white":        "#f4e4ba",
        "beige":              "#f2f3d9",
        "tea-green":          "#c2d8b9",
        "granny-smith-apple": "#b0f2b4",  # 10
        "inchworm":           "#b9e769",  # 20
        "light-green":        "#83e377",
        "medium-aquamarine":  "#16db93",
        "keppel":             "#0db39e",
        "blizzard-blue":      "#b8f3ff",
        "magic-mint":         "#9df7e5",
        "middle-blue":        "#8ac6d0",
        "cadet-blue":         "#58a4b0",  # 25
        "blue-munsell":       "#048ba8",
        "sapphire-blue":      "#2c699a",
        "dark-slate-blue":    "#54478c",
        "wisteria":           "#b49fcc",
        "african-violet":     "#b07bac",  # 14
        "red-violet-crayola": "#af4d98",  # 29
        "wild-orchid":        "#d66ba0",
        "cyclamen":           "#e87ea1",
    }
    # darkmode_colors = {
    #     "fiery-rose":         "#ff5964",
    #     "wild-orchid":        "#d66ba0",
    #     "cyclamen":           "#e87ea1",
    #     "antique-brass":      "#dc9e82",
    #     "melon":              "#ebb3a9",
    #     "gold-crayola":       "#dcc48e",
    #     "dutch-white":        "#f4e4ba",
    #     "beige":              "#f2f3d9",
    #     "tea-green":          "#c2d8b9",
    #     "granny-smith-apple": "#b0f2b4",  # 10
    #     "magic-mint":         "#9df7e5",
    #     "blizzard-blue":      "#b8f3ff",
    #     "wisteria":           "#b49fcc",
    #     "african-violet":     "#b07bac",  # 14
    #     "white":              "#ffffff",
    # }
    # lightmode_colors = {
    #     "vivid-burgundy":     "#a5243d",
    #     "cedar-chest":        "#be5a38",  # 16
    #     "sandy-brown":        "#f29e4c",  # 17
    #     "maize-crayola":      "#f1c453",
    #     "corn":               "#efea5a",
    #     "inchworm":           "#b9e769",  # 20
    #     "light-green":        "#83e377",
    #     "medium-aquamarine":  "#16db93",
    #     "keppel":             "#0db39e",
    #     "middle-blue":        "#8ac6d0",
    #     "cadet-blue":         "#58a4b0",  # 25
    #     "blue-munsell":       "#048ba8",
    #     "sapphire-blue":      "#2c699a",
    #     "dark-slate-blue":    "#54478c",
    #     "red-violet-crayola": "#af4d98",  # 29
    #     "grey":               "#808080",
    #     "black":              "#000000",
    # }
    colors = []
    for title, hex in all_colors.items():
        color = Color(title=title,
                      hex=hex,
                      mode="dark",
                      )
        colors.append(color)
        db.session.add(color)

    # for title, hex in lightmode_colors.items():
    #     color = Color(title=title,
    #                   hex=hex,
    #                   mode="light",
    #                   )
    #     db.session.add(color)
    #     colors.append(color)
    db.session.commit()

    myki = User(username="myki",
                first_name="Mira",
                last_name="Kim",
                email="alimirakim@gmail.com",
                hashed_password="pbkdf2:sha256:150000$vCX0hKgt$29bfb9894101cb9b426a40b4f4d7c4f22011aca3eb2494fc66235fe81e74762c",
                color=colors[1],
                icon=icons[0],
                birthday=date(1991, 6, 27)
                )
    dyclee = User(username="dyclee",
                  first_name="David",
                  last_name="Lee",
                  email="fakedavid@gmail.com",
                  hashed_password="pbkdf2:sha256:150000$vCX0hKgt$29bfb9894101cb9b426a40b4f4d7c4f22011aca3eb2494fc66235fe81e74762c",                  color=colors[2],
                  icon=icons[0],
                  birthday=date(1994, 8, 18)
                  )
    yn = User(username="yn",
              first_name="Yegres",
              last_name="Nidirg",
              email="yegresnidirg@gmail.com",
              hashed_password="pbkdf2:sha256:150000$vCX0hKgt$29bfb9894101cb9b426a40b4f4d7c4f22011aca3eb2494fc66235fe81e74762c",
              color=colors[5],
              icon=icons[0],
              )
    inho = User(username="InhoShi",
                first_name="Derek",
                last_name="Kim",
                email="fakederek@gmail.com",
                hashed_password="pbkdf2:sha256:150000$vCX0hKgt$29bfb9894101cb9b426a40b4f4d7c4f22011aca3eb2494fc66235fe81e74762c",
                color=colors[6],
                icon=icons[0],
                birthday=date(1993, 4, 4)
                )
    aly = User(username="Aly Cat",
               first_name="Aly",
               last_name="Cat",
               email="fakeali@gmail.com",
               hashed_password="pbkdf2:sha256:150000$vCX0hKgt$29bfb9894101cb9b426a40b4f4d7c4f22011aca3eb2494fc66235fe81e74762c",
               color=colors[7],
               icon=icons[0],
               birthday=date(1994, 3, 3)
               )
    sophie = User(username="sophie",
                  first_name="Sophia",
                  last_name="S.",
                  email="sophie@gmail.com",
                  hashed_password="pbkdf2:sha256:150000$vCX0hKgt$29bfb9894101cb9b426a40b4f4d7c4f22011aca3eb2494fc66235fe81e74762c",
                  color=colors[8],
                  icon=icons[0],
                  birthday=date(1995, 2, 2)
                  )
    ashe = User(username="ashen",
                first_name="Ashe",
                last_name="Dawn",
                email="ashendawn@gmail.com",
                hashed_password="pbkdf2:sha256:150000$vCX0hKgt$29bfb9894101cb9b426a40b4f4d7c4f22011aca3eb2494fc66235fe81e74762c",
                color=colors[9],
                icon=icons[0],
                )
    mom = User(username="DemoMom",
               first_name="demo",
               last_name="lina",
               email="demolina@gmail.com",
               hashed_password="pbkdf2:sha256:150000$vCX0hKgt$29bfb9894101cb9b426a40b4f4d7c4f22011aca3eb2494fc66235fe81e74762c",
               color=colors[10],
               icon=icons[0],
               birthday=date(1989, 11, 19),
               )
    demo = User(username="DemoUser",
                first_name="Demo",
                last_name="User",
                email="demo@gmail.com",
                hashed_password="pbkdf2:sha256:150000$vCX0hKgt$29bfb9894101cb9b426a40b4f4d7c4f22011aca3eb2494fc66235fe81e74762c",
                birthday=date(1990, 12, 25),
                color=colors[10],
                icon=icons[0],
                )
    users = [myki, dyclee, yn, inho, aly, sophie, ashe, mom, demo]
    for user in users:
        db.session.add(user)
    db.session.commit()

    # Programs
    program_one = Program(title="Work",
                          description="bring home the bacon",
                          color=colors[0],
                          creator_id=9,
                          icon_id=28,
                          created_at=date(2019, 12, 1),
                          )
    program_two = Program(title="Social",
                          description="family and friends",
                          color=colors[22],
                          creator_id=9,
                          icon_id=8,
                          created_at=date(2019, 12, 15),
                          )
    program_three = Program(title="Chores and errands",
                            description="just do it",
                            color=colors[11],
                            creator_id=9,
                            icon_id=6,
                            created_at=date(2019, 12, 31),
                            )
    program_mom = Program(title="Sophia and Mom",
                          description="",
                          color=colors[11],
                          creator_id=1,
                          )
    program_me = Program(title="Promises to Me",
                         description="",
                         color=colors[12],
                         creator_id=2,
                         )
    program_ashe = Program(title="Mario Kart Championships",
                           description="",
                           color=colors[13],
                           creator_id=2,
                           )
    programs = [program_one, program_two, program_three,
                program_mom, program_me, program_ashe]

    for program in programs:
        db.session.add(program)

    db.session.commit()

    # Activities
    activity_workone = Activity(title="Code",
                          description="code once a day keeps the doctor away.. ",
                          frequency=7,
                          color=colors[1],
                          icon_id=19,
                          program=program_one,
                          creator=demo,
                          created_at=datetime(2019, 12, 1),
                          )
    activity_worktwo = Activity(title="Team Meetings",
                          description="meet with team to discuss project",
                          frequency=5,
                          color=colors[5],
                          icon_id=1,
                          program=program_one,
                          creator=demo,
                          created_at=datetime(2020, 1, 4),
                          )
    activity_socialone = Activity(title="Spot",
                            description="take spot to the park",
                            frequency=4,
                            color=colors[2],
                            icon_id=24,
                            program=program_two,
                            creator=demo,
                            created_at=datetime(2020, 5, 29),
                            )
    activity_socialtwo = Activity(title="Date Night",
                            description="love is in the air",
                            frequency=1,
                            color=colors[15],
                            icon_id=13,
                            program=program_two,
                            creator=demo,
                            created_at=datetime(2020, 2, 18),
                            )
    activity_socialthree = Activity(title="Gameday!",
                              description="we're winning it this year",
                              frequency=1,
                              color=colors[16],
                              icon_id=14,
                              program=program_two,
                              creator=demo,
                              created_at=datetime(2020, 11, 11),
                              )
    activity_choresone = Activity(title="Dishes",
                            description="you promised",
                            frequency=7,
                            color=colors[21],
                            icon_id=3,
                            program=program_three,
                            creator=demo,
                            created_at=datetime(2020, 8, 17),
                            )
    activity_chorestwo = Activity(title="Drive Sara to practice",
                            description="5:30 at Palmer Field",
                            frequency=3,
                            color=colors[17],
                            icon_id=12,
                            program=program_three,
                            creator=demo,
                            created_at=datetime(2020, 7, 5),
                            )
    activity_choresthree = Activity(title="Exercise/Gym",
                              description="don't forget leg day",
                              frequency=3,
                              color=colors[4],
                              icon_id=16,
                              program=program_three,
                              creator=demo,
                              created_at=datetime(2019, 12, 31),
                              )
    activity_veggies = Activity(title="Eat Veggies",
                          description="",
                          frequency=7,
                          color=colors[16],
                          icon=icons[11],
                          program=program_mom,
                          creator=mom,
                          )
    activity_dog = Activity(title="Walk Bentley",
                      description="",
                      frequency=7,
                      color=colors[13],
                      icon=icons[9],
                      program=program_mom,
                      creator=mom,
                      )
    activity_teeth = Activity(title="Brush Teeth",
                        description="",
                        frequency=7,
                        color=colors[10],
                        icon=icons[7],
                        program=program_mom,
                        creator=mom,
                        )
    activity_hair = Activity(title="brush hair",
                       description="",
                       frequency=7,
                       color=colors[2],
                       icon=icons[4],
                       program=program_me,
                       creator=sophie,
                       )
    activity_dress = Activity(title="wear a pretty dress",
                        description="",
                        frequency=7,
                        color=colors[2],
                        icon=icons[4],
                        program=program_me,
                        creator=sophie,
                        )
    activity_draw = Activity(title="draw a picture",
                       description="",
                       frequency=5,
                       color=colors[2],
                       icon=icons[6],
                       program=program_me,
                       creator=sophie,
                       )
    activity_play = Activity(title="play with Ashe",
                       description="",
                       frequency=5,
                       color=colors[2],
                       icon=icons[4],
                       program=program_me,
                       creator=sophie,
                       )
    activity_win = Activity(title="win at mario kart",
                      description="",
                      frequency=5,
                      color=colors[18],
                      icon=icons[5],
                      program=program_ashe,
                      creator=ashe,
                      )
    activities = [activity_workone, activity_worktwo, activity_socialone, activity_socialtwo, activity_socialthree,
              activity_choresone, activity_chorestwo, activity_choresthree, activity_dog, activity_draw, activity_dress,
              activity_hair, activity_play, activity_teeth, activity_veggies, activity_win]

    for activity in activities:
        db.session.add(activity)

    db.session.commit()
    member_demo1 = Membership(
        program=program_one, member=demo, stamper=demo, points=27, joined_at=datetime(2019, 12, 1)
    )
    member_demo2 = Membership(
        program=program_two, member=demo, stamper=demo, points=15, joined_at=datetime(2019, 12, 15)
    )
    member_demo3 = Membership(
        program=program_three, member=demo, stamper=demo, points=3, joined_at=datetime(2019, 12, 31)
    )
    member_sophie1 = Membership(
        program=program_mom, member=sophie, stamper=mom, points=10,
    )
    member_sophie2 = Membership(
        program=program_me, member=sophie, stamper=sophie, points=13,
    )
    member_sophie3 = Membership(
        program=program_ashe, member=sophie, stamper=ashe, points=0,
    )
    member_ashe = Membership(
        program=program_ashe, member=ashe, stamper=sophie, points=24,
    )
    member_aly = Membership(
        program=program_ashe, member=aly, stamper=ashe, points=12,
    )

    members = [member_demo1, member_demo2, member_demo3, member_aly, member_ashe, member_sophie1,
               member_sophie2, member_sophie3]
    for member in members:
        db.session.add(member)

    db.session.commit()

    def create_stamps(year=2020, month=11):
        """Generate stamp instances and add to db session."""
        for d in range(1, 30):
            if d in (1, 7, 8, 15, 21, 22, 28):
                stamp = Stamp(
                    date=date(2020, 11, d),
                    status='stamped', activity=activity_teeth, membership=member_sophie1,
                )
                db.session.add(stamp)

    # randomlist = []
    # for i in range(0,5):
    # n = random.randint(1,30)
    # randomlist.append(n)
    # print(randomlist)
    # activities = [activity_workone, activity_worktwo, activity_socialone, activity_socialtwo, activity_socialthree,
    #     activity_choresone, activity_chorestwo, activity_choresthree, activity_dog, activity_draw, activity_dress,
    #     activity_hair, activity_play, activity_teeth, activity_veggies, activity_win]

# Total_number_days = monthrange(2020, 2)[1]
# print("\nTotal Number of Days in a Month: ",Total_number_days)
    def createStamps(activity, membership, month, year, missedDays):
        maxDays = monthrange(year, month)[1]
        missedList = []
        while len(missedList) < missedDays:
            missedStampDay = randint(1, maxDays)
            if missedStampDay not in missedList:
                missedList.append(missedStampDay)
        for d in range(1, 30):
            if d not in missedList:
                stamp = Stamp(
                    date=date(year, month, d),
                    status='stamped',
                    activity=activity,
                    membership_id=membership
                )
                db.session.add(stamp)
        db.session.commit()

    createStamps(activity_workone, 1, 12, 2019, 4)
    createStamps(activity_workone, 1, 1, 2020, 1)
    createStamps(activity_workone, 1, 2, 2020, 3)
    createStamps(activity_workone, 1, 3, 2020, 0)
    createStamps(activity_workone, 1, 4, 2020, 2)
    createStamps(activity_workone, 1, 5, 2020, 4)
    createStamps(activity_workone, 1, 6, 2020, 6)
    createStamps(activity_workone, 1, 7, 2020, 8)
    createStamps(activity_workone, 1, 8, 2020, 7)
    createStamps(activity_workone, 1, 9, 2020, 4)
    createStamps(activity_workone, 1, 10, 2020, 3)
    createStamps(activity_workone, 1, 11, 2020, 1)

    createStamps(activity_worktwo, 1, 1, 2020, 12)
    createStamps(activity_worktwo, 1, 2, 2020, 10)
    createStamps(activity_worktwo, 1, 3, 2020, 8)
    createStamps(activity_worktwo, 1, 4, 2020, 9)
    createStamps(activity_worktwo, 1, 5, 2020, 11)
    createStamps(activity_worktwo, 1, 6, 2020, 18)
    createStamps(activity_worktwo, 1, 7, 2020, 20)
    createStamps(activity_worktwo, 1, 8, 2020, 17)
    createStamps(activity_worktwo, 1, 9, 2020, 15)
    createStamps(activity_worktwo, 1, 10, 2020, 15)
    createStamps(activity_worktwo, 1, 11, 2020, 17)

    createStamps(activity_socialone, 2, 6, 2020, 13)
    createStamps(activity_socialone, 2, 7, 2020, 14)
    createStamps(activity_socialone, 2, 8, 2020, 18)
    createStamps(activity_socialone, 2, 9, 2020, 15)
    createStamps(activity_socialone, 2, 10, 2020, 25)
    createStamps(activity_socialone, 2, 11, 2020, 24)

    createStamps(activity_socialtwo, 2, 2, 2020, 26)
    createStamps(activity_socialtwo, 2, 3, 2020, 25)
    createStamps(activity_socialtwo, 2, 4, 2020, 26)
    createStamps(activity_socialtwo, 2, 5, 2020, 25)
    createStamps(activity_socialtwo, 2, 6, 2020, 25)
    createStamps(activity_socialtwo, 2, 7, 2020, 25)
    createStamps(activity_socialtwo, 2, 8, 2020, 24)
    createStamps(activity_socialtwo, 2, 9, 2020, 24)
    createStamps(activity_socialtwo, 2, 10, 2020, 25)
    createStamps(activity_socialtwo, 2, 11, 2020, 26)

    gamedays = [8, 15, 20, 22, 29]
    for day in gamedays:
        stamp = Stamp(
            date=date(2020, 11, day),
            status='stamped', activity=activity_socialthree, membership_id=2,
        )
        db.session.add(stamp)
        db.session.commit()

    createStamps(activity_choresone, 3, 8, 2020, 10)
    createStamps(activity_choresone, 3, 9, 2020, 6)
    createStamps(activity_choresone, 3, 10, 2020, 3)
    createStamps(activity_choresone, 3, 11, 2020, 0)

    # July 5/2020
    startActivityDate = date(2020, 7, 5)
    while startActivityDate < date.today():
        weekdays = ["Monday", "Wednesday", "Friday"]
        if startActivityDate.strftime("%A") in weekdays:
            newStamp = Stamp(
                date=startActivityDate.strftime("%Y-%m-%d"),
                status='stamped',
                activity=activity_chorestwo,
                membership_id=3,
            )
            db.session.add(newStamp)
            db.session.commit()
        startActivityDate += timedelta(days=1)

    createStamps(activity_choresthree, 3, 1, 2020, 5)
    createStamps(activity_choresthree, 3, 2, 2020, 13)
    createStamps(activity_choresthree, 3, 3, 2020, 14)
    createStamps(activity_choresthree, 3, 4, 2020, 19)
    createStamps(activity_choresthree, 3, 5, 2020, 20)
    createStamps(activity_choresthree, 3, 6, 2020, 17)
    createStamps(activity_choresthree, 3, 7, 2020, 14)
    createStamps(activity_choresthree, 3, 8, 2020, 10)
    createStamps(activity_choresthree, 3, 9, 2020, 12)
    createStamps(activity_choresthree, 3, 10, 2020, 13)
    createStamps(activity_choresthree, 3, 11, 2020, 10)

    for d in range(1, 30):
        if d in (1, 7, 8, 14, 15, 21, 22, 26, 28, 29):
            stamp = Stamp(
                date=date(2020, 11, d),
                status='stamped', activity=activity_draw, membership=member_sophie2,
            )
            db.session.add(stamp)
    for d in range(1, 30):
        if d in (1, 3, 4, 14, 17, 20, 22, 28, 26):
            stamp = Stamp(
                date=date(2020, 10, d),
                status='stamped', activity=activity_draw, membership=member_sophie2,
            )
            db.session.add(stamp)
    for d in range(1, 30):
        if d in (1, 4, 7):
            stamp = Stamp(
                date=date(2020, 8, d),
                status='stamped', activity=activity_draw, membership=member_sophie2,
            )
            db.session.add(stamp)

    for d in range(1, 30):
        if d not in (1, 7, 8, 14, 15, 21, 22, 23, 24, 25, 29):
            print("\nDATE", d)
            print(datetime(2020, 11, d))
            stamp1 = Stamp(
                date=date(2020, 11, d),
                status='stamped', activity=activity_hair, membership=member_sophie2,
            )
            stamp2 = Stamp(
                date=date(2020, 11, d),
                status='stamped', activity=activity_dress, membership=member_sophie2,
            )
            db.session.add(stamp1)
            db.session.add(stamp2)

    rewardOne = Reward(title="go out for ice cream",
                       description="free ice cream",
                       cost=5,
                       color=colors[4],
                       limit_per_member=-1,
                       quantity=5,
                       icon=icons[28],
                       program_id=2,
                       creator=demo,
                       type="custom",
                       )
    rewardThree = Reward(title="new bike",
                         description="john promises to buy a new bike",
                         cost=100,
                         color=colors[20],
                         limit_per_member=1,
                         quantity=1,
                         icon=icons[22],
                         program_id=2,
                         creator=demo,
                         type="custom",
                         )
    rewardTwo = Reward(title="bowling night",
                       description="bowling with the boizzz",
                       cost=7,
                       color=colors[8],
                       limit_per_member=2,
                       quantity=2,
                       icon=icons[14],
                       program_id=2,
                       creator=demo,
                       type="custom",
                       )
    rewardFour = Reward(title="trip to the casino",
                        description="with robert, lyn, and rita",
                        cost=25,
                        color=colors[5],
                        limit_per_member=1,
                        quantity=1,
                        icon=icons[10],
                        program_id=2,
                        creator=demo,
                        type="custom",
                        )
    db.session.add(rewardOne)
    db.session.add(rewardTwo)
    db.session.add(rewardThree)
    db.session.add(rewardFour)
    db.session.commit()

    cookies = ["Chocolate Chip", "Sugar", "Mint", "Peanut Butter"]
    for cookie in cookies:
        reward = Reward(type='custom',
                        title=f"{cookie} Cookie",
                        description=f"One giant {cookie.lower()} cookie.",
                        cost=7,
                        color=colors[7],
                        limit_per_member=-1,
                        quantity=-1,
                        icon=icons[12],
                        program=program_mom,
                        creator=mom,
                        )
        db.session.add(reward)

    db.session.commit()