from dotenv import load_dotenv
load_dotenv()

from datetime import datetime
from app import app, db
from app.models import User, Program, Habit, Stamp, DailyStamp, Member, Reward


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

    stamp_user = Stamp(stamp="user-circle",type="people")
    stamp_program = Stamp(stamp="calendar-alt",type="things",)
    stamp_habit = Stamp(stamp="check-circle",type="symbols",)
    stamp_reward = Stamp(stamp="award",type="things",)
    stamp_turtle = Stamp(stamp="turtle",type="animals",)
    stamp_tooth = Stamp(stamp="tooth", type="body")
    stamp_carrot = Stamp(stamp="carrot", type="food")
    stamp_dog = Stamp(stamp="dog",type="animals",)
    stamp_turtle = Stamp(stamp="cat", type="animals",)
    stamp_heart = Stamp(stamp="heart", type="symbols")
    stamp_paint = Stamp(stamp="paint", type="things")
    stamp_star = Stamp(stamp="star", type="symbols")
    stamp_cookie = Stamp(stamp="cookie", type="food")
    stamp_palette = Stamp(stamp="palette", type="things")

    stamps = [
        stamp_carrot, stamp_dog, stamp_habit, stamp_heart, stamp_paint, 
        stamp_program, stamp_reward, stamp_star, stamp_tooth, stamp_turtle,
        stamp_user,
    ]
    for stamp in stamps:
        db.session.add(stamp)

    myki = User(username="myki",
                  first_name="Mira",
                  last_name="Kim",
                  email="alimirakim@gmail.com",
                  hashword="password",
                  color="#af4d98",
                  stamp=stamp_user,
                  birthday=datetime(1991, 6, 27)
    )
    dyclee = User(username="dyclee",
                  first_name="David",
                  last_name="Lee",
                  email="fakedavid@gmail.com",
                  hashword="password",
                  color="#d66ba0",
                  stamp=stamp_user,
                  birthday=datetime(1994, 8, 18)
    )
    awod = User(username="Awodfkai",
                  first_name="Brian",
                  last_name="Wang",
                  email="fakebrian@gmail.com",
                  hashword="password",
                  color="#b0f2b4",
                  stamp=stamp_user,
                  birthday=datetime(1992, 7, 17)
    )
    eric = User(username="eric",
                  first_name="Eric",
                  last_name="Lyda",
                  email="fakeeric@gmail.com",
                  hashword="password",
                  color="#58a4b0",
                  stamp=stamp_user,
                  birthday=datetime(1990, 6, 6)
    )
    yn = User(username="yn",
                  first_name="Yegres",
                  last_name="Nidirg",
                  email="yegresnidirg@gmail.com",
                  hashword="password",
                  color="#f1c453",
                  stamp=stamp_user,
    )
    inho = User(username="InhoShi",
                  first_name="Derek",
                  last_name="Kim",
                  email="fakederek@gmail.com",
                  hashword="password",
                  color="#efea5a",
                  stamp=stamp_user,
                  birthday=datetime(1993, 4, 4)
    )
    aly = User(username="Aly Cat",
                  first_name="Aly",
                  last_name="Cat",
                  email="fakeali@gmail.com",
                  hashword="password",
                  color="#54478c",
                  stamp=stamp_user,
                  birthday=datetime(1994, 3, 3)
    )
    sophie = User(username="sophie",
                  first_name="Sophia",
                  last_name="S.",
                  email="sophie@gmail.com",
                  hashword="password",
                  color="#0db39e",
                  stamp=stamp_user,
                  birthday=datetime(1995, 2, 2)
    )
    ashe = User(username="ashen",
                  first_name="Ashe",
                  last_name="Dawn",
                  email="ashendawn@gmail.com",
                  hashword="password",
                  color="#16db93",
                  stamp=stamp_user,
    )
    mom = User(username="DemoMom",
                  first_name="demo",
                  last_name="lina",
                  email="demolina@gmail.com",
                  hashword="password",
                  color="#0db39e",
                  stamp=stamp_user,
    )
    users = [myki, dyclee, awod, eric, yn, inho, aly, sophie, ashe, mom]
    for user in users:
        db.session.add(user)
    db.session.commit()

    # Programs
    program_mom = Program(program="Sophia and Mom",
                        description="",
                        color="#d66ba0",
                        creator_id=1,
    )
    program_me = Program(program="Promises to Me",
                        description="",
                        color="#d66ba0",
                        creator_id=2,
    )
    program_ashe = Program(program="Mario Kart Championships",
                        description="",
                        color="#d66ba0",
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
                    color="#f1c453",
                    stamp=stamp_carrot,
                    program=program_mom,
                    creator=mom,
    )
    habit_dog = Habit(habit="Walk Bentley",
                    description="",
                    frequency="ttttttt",
                    color="#54478c",
                    stamp=stamp_dog,
                    program=program_mom,
                    creator=mom,
    )
    habit_teeth = Habit(habit="Brush Teeth",
                    description="",
                    frequency="ttttttt",
                    color="#048ba8",
                    stamp=stamp_tooth,
                    program=program_mom,
                    creator=mom,
    )
    habit_hair = Habit(habit="brush hair",
                    description="",
                    frequency="ttttttt",
                    color="#d66ba0",
                    stamp=stamp_heart,
                    program=program_me,
                    creator=sophie,
    )
    habit_dress = Habit(habit="wear a pretty dress",
                    description="",
                    frequency="ttttttt",
                    color="#d66ba0",
                    stamp=stamp_heart,
                    program=program_me,
                    creator=sophie,
    )
    habit_draw = Habit(habit="draw a picture",
                    description="",
                    frequency="tffffft",
                    color="#d66ba0",
                    stamp=stamp_paint,
                    program=program_me,
                    creator=sophie,
    )
    habit_play = Habit(habit="play with Ashe",
                    description="",
                    frequency="tffffft",
                    color="#d66ba0",
                    stamp=stamp_heart,
                    program=program_me,
                    creator=sophie,
    )
    habit_win = Habit(habit="win at mario kart",
                    description="",
                    frequency="tffffft",
                    color="#efea5a",
                    stamp=stamp_star,
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


    colors = {
        "fiery-rose":         "#ff5964",
        "wild-orchid":        "#d66ba0",
        "cyclamen":           "#e87ea1",
        "antique-brass":      "#dc9e82",
        "melon":              "#ebb3a9",
        "gold-crayola":       "#dcc48e",
        "dutch-white":        "#f4e4ba",
        "beige":              "#f2f3d9",
        "tea-green":          "#c2d8b9",
        "granny-smith-apple": "#b0f2b4",
        "magic-mint":         "#9df7e5",
        "blizzard-blue":      "#b8f3ff",
        "wisteria":           "#b49fcc",
        "african-violet":     "#b07bac",
        "vivid-burgundy":     "#a5243d",
        "cedar-chest":        "#be5a38",
        "sandy-brown":        "#f29e4c",
        "maize-crayola":      "#f1c453",
        "corn":               "#efea5a",
        "inchworm":           "#b9e769",
        "light-green":        "#83e377",
        "medium-aquamarine":  "#16db93",
        "keppel":             "#0db39e",
        "middle-blue":        "#8ac6d0",
        "cadet-blue":         "#58a4b0",
        "blue-munsell":       "#048ba8",
        "sapphire-blue":      "#2c699a",
        "dark-slate-blue":    "#54478c",
        "red-violet-crayola": "#af4d98",
    }

    for color, hex in colors.items():
        reward = Reward(type='color',
                        reward=f"Color: {color.title()}",
                        description=f"Gain access to the '{color.title()}' color theme!",
                        cost=7,
                        color=hex,
                        limit_per_member=1,
                        quantity=-1, 
                        stamp=stamp_palette,
        )
        db.session.add(reward)

    cookies = ["Chocolate Chip", "Sugar", "Mint", "Peanut Butter"]
    for cookie in cookies:
        reward = Reward(type='custom',
                        reward=f"{cookie} Cookie",
                        description=f"One giant {cookie.lower()} cookie.",
                        cost=7,
                        color="#be5a38",
                        limit_per_member=-1,
                        quantity=-1, 
                        stamp=stamp_cookie,
                        program=program_mom,
                        creator=mom,
        )
        db.session.add(reward)

    db.session.commit()