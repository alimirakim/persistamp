from dotenv import load_dotenv
load_dotenv()

from datetime import datetime
from app import app, db
from app.models.everything import User, Program, Habit, Stamp, DailyStamp, Member, Reward, Color


with app.app_context():
    db.drop_all()
    db.create_all()

    stamps = {
      "symbols": [""],
      "animals": [""],
      "people": [""],
      "food": [""],
      "things": [""],
      "other": [""],
      "body": [""],
    }

    users = [""]
    stamp_sets = {
        "defaults": ["user-circle", "calendar-alt", "check-circle", "award"],
        "symbols": ["heart", "star"],
        "things": ["palette"],
        "people": [],
        "body": ["tooth"],
        "animals": ["turtle", "dog", "cat"],
        "food": ["carrot", "cookie"],
    }    
    
    stamps = []
    for type, names in stamp_sets.items():
        [stamps.append(Stamp(type=type, stamp=stamp)) for stamp in names]
    for stamp in stamps:
        db.session.add(stamp)


    darkmode_colors = {
        "fiery-rose":         "#ff5964",
        "wild-orchid":        "#d66ba0",
        "cyclamen":           "#e87ea1",
        "antique-brass":      "#dc9e82",
        "melon":              "#ebb3a9",
        "gold-crayola":       "#dcc48e",
        "dutch-white":        "#f4e4ba",
        "beige":              "#f2f3d9",
        "tea-green":          "#c2d8b9",
        "granny-smith-apple": "#b0f2b4", # 10
        "magic-mint":         "#9df7e5",
        "blizzard-blue":      "#b8f3ff",
        "wisteria":           "#b49fcc",
        "african-violet":     "#b07bac", # 14
    }
    lightmode_colors = {
        "vivid-burgundy":     "#a5243d",
        "cedar-chest":        "#be5a38", # 16
        "sandy-brown":        "#f29e4c", # 17
        "maize-crayola":      "#f1c453",
        "corn":               "#efea5a",
        "inchworm":           "#b9e769", # 20
        "light-green":        "#83e377",
        "medium-aquamarine":  "#16db93",
        "keppel":             "#0db39e",
        "middle-blue":        "#8ac6d0",
        "cadet-blue":         "#58a4b0", # 25
        "blue-munsell":       "#048ba8",
        "sapphire-blue":      "#2c699a",
        "dark-slate-blue":    "#54478c",
        "red-violet-crayola": "#af4d98", # 29
    }
    colors = []
    for name, hex in darkmode_colors.items():
        color = Color(name=name,
                      hex=hex,
                      mode="dark",
        )
        colors.append(color)
        db.session.add(color)
        
    for name, hex in lightmode_colors.items():
        color = Color(name=name,
                      hex=hex,
                      mode="light",
                      )
        db.session.add(color)
        colors.append(color)
    db.session.commit()


    myki = User(username="myki",
                  first_name="Mira",
                  last_name="Kim",
                  email="alimirakim@gmail.com",
                  hashed_password="password",
                  color=colors[1],
                  stamp=stamps[0],
                  birthday=datetime(1991, 6, 27)
    )
    dyclee = User(username="dyclee",
                  first_name="David",
                  last_name="Lee",
                  email="fakedavid@gmail.com",
                  hashed_password="password",
                  color=colors[2],
                  stamp=stamps[0],
                  birthday=datetime(1994, 8, 18)
    )
    awod = User(username="Awodfkai",
                  first_name="Brian",
                  last_name="Wang",
                  email="fakebrian@gmail.com",
                  hashed_password="password",
                  color=colors[3],
                  stamp=stamps[0],
                  birthday=datetime(1992, 7, 17)
    )
    eric = User(username="eric",
                  first_name="Eric",
                  last_name="Lyda",
                  email="fakeeric@gmail.com",
                  hashed_password="password",
                  color=colors[4],
                  stamp=stamps[0],
                  birthday=datetime(1990, 6, 6)
    )
    yn = User(username="yn",
                  first_name="Yegres",
                  last_name="Nidirg",
                  email="yegresnidirg@gmail.com",
                  hashed_password="password",
                  color=colors[5],
                  stamp=stamps[0],
    )
    inho = User(username="InhoShi",
                  first_name="Derek",
                  last_name="Kim",
                  email="fakederek@gmail.com",
                  hashed_password="password",
                  color=colors[6],
                  stamp=stamps[0],
                  birthday=datetime(1993, 4, 4)
    )
    aly = User(username="Aly Cat",
                  first_name="Aly",
                  last_name="Cat",
                  email="fakeali@gmail.com",
                  hashed_password="password",
                  color=colors[7],
                  stamp=stamps[0],
                  birthday=datetime(1994, 3, 3)
    )
    sophie = User(username="sophie",
                  first_name="Sophia",
                  last_name="S.",
                  email="sophie@gmail.com",
                  hashed_password="password",
                  color=colors[8],
                  stamp=stamps[0],
                  birthday=datetime(1995, 2, 2)
    )
    ashe = User(username="ashen",
                  first_name="Ashe",
                  last_name="Dawn",
                  email="ashendawn@gmail.com",
                  hashed_password="password",
                  color=colors[9],
                  stamp=stamps[0],
    )
    mom = User(username="DemoMom",
                  first_name="demo",
                  last_name="lina",
                  email="demolina@gmail.com",
                  hashed_password="password",
                  color=colors[10],
                  stamp=stamps[0],
    )
    users = [myki, dyclee, awod, eric, yn, inho, aly, sophie, ashe, mom]
    for user in users:
        db.session.add(user)
    db.session.commit()

    # Programs
    program_mom = Program(program="Sophia and Mom",
                        description="",
                        color=colors[11],
                        creator_id=1,
    )
    program_me = Program(program="Promises to Me",
                        description="",
                        color=colors[12],
                        creator_id=2,
    )
    program_ashe = Program(program="Mario Kart Championships",
                        description="",
                        color=colors[13],
                        creator_id=2,
    )
    programs = [program_mom, program_me, program_ashe]

    for program in programs:
        db.session.add(program)

    db.session.commit()

    # Habits
    habit_veggies = Habit(habit="Eat Veggies",
                    description="",
                    frequency="ttttttt",
                    color=colors[16],
                    stamp=stamps[11],
                    program=program_mom,
                    creator=mom,
    )
    habit_dog = Habit(habit="Walk Bentley",
                    description="",
                    frequency="ttttttt",
                    color=colors[13],
                    stamp=stamps[9],
                    program=program_mom,
                    creator=mom,
    )
    habit_teeth = Habit(habit="Brush Teeth",
                    description="",
                    frequency="ttttttt",
                    color=colors[10],
                    stamp=stamps[7],
                    program=program_mom,
                    creator=mom,
    )
    habit_hair = Habit(habit="brush hair",
                    description="",
                    frequency="ttttttt",
                    color=colors[2],
                    stamp=stamps[4],
                    program=program_me,
                    creator=sophie,
    )
    habit_dress = Habit(habit="wear a pretty dress",
                    description="",
                    frequency="ttttttt",
                    color=colors[2],
                    stamp=stamps[4],
                    program=program_me,
                    creator=sophie,
    )
    habit_draw = Habit(habit="draw a picture",
                    description="",
                    frequency="tffffft",
                    color=colors[2],
                    stamp=stamps[6],
                    program=program_me,
                    creator=sophie,
    )
    habit_play = Habit(habit="play with Ashe",
                    description="",
                    frequency="tffffft",
                    color=colors[2],
                    stamp=stamps[4],
                    program=program_me,
                    creator=sophie,
    )
    habit_win = Habit(habit="win at mario kart",
                    description="",
                    frequency="tffffft",
                    color=colors[18],
                    stamp=stamps[5],
                    program=program_ashe,
                    creator=ashe,
    )
    habits = [habit_dog, habit_draw, habit_dress, habit_hair, habit_play,
        habit_teeth, habit_veggies, habit_win]

    for habit in habits:
        db.session.add(habit)

    db.session.commit()

    member_sophie1 = Member(
        program=program_mom, member=sophie, stamper=mom, points=10,
    )
    member_sophie2 = Member(
        program=program_me, member=sophie, stamper=sophie,points=13,
    )
    member_sophie3 = Member(
        program=program_ashe, member=sophie, stamper=ashe, points=0,
    )
    member_ashe = Member(
        program=program_ashe, member=ashe, stamper=sophie, points=24,
    )
    member_aly = Member(
        program=program_ashe, member=aly, stamper=ashe, points=12,
    )

    members = [member_aly, member_ashe, member_sophie1, member_sophie2, member_sophie3]
    for member in members:
        db.session.add(member)

    db.session.commit()

    def create_daily_stamps(year=2020, month=11):
        """Generate daily stamp instances and add to db session."""
        for d in range(1, 30):
            if d in (1, 7, 8, 15, 21, 22, 28):
                print("\nSTAMP WHYYY", dir(DailyStamp))
                daily = DailyStamp(
                    date=datetime(2020, 11, d),
                    status='stamped', habit=habit_teeth, member=member_sophie1,
                )
                db.session.add(daily)

    for d in range(1, 30):
        if d in (1, 7, 8, 14, 15, 21, 22, 26, 28, 29):
            daily = DailyStamp(
                date=datetime(2020, 11, d),
                status='stamped', habit=habit_draw, member=member_sophie2,
            )
            db.session.add(daily)

    for d in range(1, 30):
        if d not in (1, 7, 8, 14, 15, 21, 22, 23, 24, 25, 29):
            print("\nDATE", d)
            print(datetime(2020, 11, d))
            daily1 = DailyStamp(
                date=datetime(2020, 11, d),
                status='stamped', habit=habit_hair, member=member_sophie2,
            )
            daily2 = DailyStamp(
                date=datetime(2020, 11, d),
                status='stamped', habit=habit_dress, member=member_sophie2,
            )
            db.session.add(daily1)
            db.session.add(daily2)





    for color in colors:
        reward = Reward(type='color',
                        reward=f"Color: {color.name.title()}",
                        description=f"Gain access to the '{color.name.title()}' color theme!",
                        cost=7,
                        color=color,
                        limit_per_member=1,
                        quantity=-1,
                        stamp=stamps[6],
        )
        db.session.add(reward)

    cookies = ["Chocolate Chip", "Sugar", "Mint", "Peanut Butter"]
    for cookie in cookies:
        reward = Reward(type='custom',
                        reward=f"{cookie} Cookie",
                        description=f"One giant {cookie.lower()} cookie.",
                        cost=7,
                        color=colors[7],
                        limit_per_member=-1,
                        quantity=-1,
                        stamp=stamps[12],
                        program=program_mom,
                        creator=mom,
        )
        db.session.add(reward)

    db.session.commit()
