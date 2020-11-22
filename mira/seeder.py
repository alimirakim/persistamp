from dotenv import load_dotenv
load_dotenv()

from datetime import datetime
from app import app, db
from app.models import db, User, Program, Habit, Stamp, Daily_Stamp, Member, Reward

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
stamp_star = Stamp(stamp="start", type="star")

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
              color="#af4d98ff",
              stamp=stamp_user,
)
dyclee = User(username="dyclee",
              first_name="David",
              last_name="Lee",
              email="fakedavid@gmail.com",
              hashword="password",
              color="#d66ba0ff",
              stamp=stamp_user,
)
awod = User(username="Awodfkai",
              first_name="Brian",
              last_name="Wang",
              email="fakebrian@gmail.com",
              hashword="password",
              color="#b0f2b4ff",
              stamp=stamp_user,
)
eric = User(username="eric",
              first_name="Eric",
              last_name="Lyda",
              email="fakeeric@gmail.com",
              hashword="password",
              color="#58a4b0ff",
              stamp=stamp_user,
)
yn = User(username="yn",
              first_name="Yegres",
              last_name="Nidirg",
              email="yegresnidirg@gmail.com",
              hashword="password",
              color="#f1c453ff",
              stamp=stamp_user,
)
inho = User(username="InhoShi",
              first_name="Derek",
              last_name="Kim",
              email="fakederek@gmail.com",
              hashword="password",
              color="#efea5aff",
              stamp=stamp_user,
)
aly = User(username="Aly Cat",
              first_name="Aly",
              last_name="Cat",
              email="fakeali@gmail.com",
              hashword="password",
              color="#54478cff",
              stamp=stamp_user,
)
sophie = User(username="sophie",
              first_name="Sophia",
              last_name="S.",
              email="demolina@gmail.com",
              hashword="password",
              color="#0db39eff",
              stamp=stamp_user,
)
ashe = User(username="ashen",
              first_name="Ashe",
              last_name="Dawn",
              email="ashendawn@gmail.com",
              hashword="password",
              color="#16db93ff",
              stamp=stamp_user,
)
mom = User(username="DemoMom",
              first_name="demo",
              last_name="lina",
              email="demolina@gmail.com",
              hashword="password",
              color="#0db39eff",
              stamp=stamp_user,
)
users = [myki, dyclee, awod, eric, yn, inho, aly, sophie, ashe, mom]


# Programs
program_mom = Program(program="Sophia and Mom",
                    description="",
                    color="#d66ba0ff",
                    creator_id=1,
)
program_me = Program(program="Promises to Me",
                    description="",
                    color="#d66ba0ff",
                    creator_id=2,
)
program_ashe = Program(program="Mario Kart Championships",
                    description="",
                    color="#d66ba0ff",
                    creator_id=2,
)

# Habits
habit_veggies = Habit(habit="Eat Veggies",
                description="",
                frequency="ttttttt",
                color="#f1c453ff",
                stamp=stamps_carrot,
                program=program_mom,
                creator=mom,
)
habit_dog = Habit(habit="Walk Bentley",
                description="",
                frequency="ttttttt",
                color="#54478cff",
                stamp_id=stamps["dog"],
                program=program_mom,
                creator_id=mom,
)
habit_teeth = Habit(habit="Brush Teeth",
                description="",
                frequency="ttttttt",
                color="#048ba8ff",
                stamp=stamps["tooth"],
                program=program_mom,
                creator=mom,
)
habit_hair = Habit(habit="brush hair",
                description="",
                frequency="ttttttt",
                color="#d66ba0ff",
                stamp=stamp_heart,
                program=program_me,
                creator=sophie,
)
habit_dress = Habit(habit="wear a pretty dress",
                description="",
                frequency="ttttttt",
                color="#d66ba0ff",
                stamp=stamp_heart,
                program=program_me,
                creator=sophie,
)
habit_draw = Habit(habit="draw a picture",
                description="",
                frequency="tffffft",
                color="#d66ba0ff",
                stamp=stamp_paint,
                program=program_me,
                creator=sophie,
)
habit_play = Habit(habit="play with Ashe",
                description="",
                frequency="tffffft",
                color="#d66ba0ff",
                stamp=stamp_heart,
                program=program_me,
                creator=sophie,
)
habit_win = Habit(habit="win at mario kart",
                description="",
                frequency="tffffft",
                color="#efea5aff",
                stamp=stamp_star,
                program=program_ashe,
                creator=ashe,
)

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

for d in range(30):
    if d in (1, 7, 8, 15, 21, 22, 28):
        daily = Daily_Stamp(
            date=datetime(2020, 11, d), 
            status='stamped', habit=habit_draw, member=sophie,
        )
        db.session.add(daily)
        
for d in range(30):
    if d in (1, 7, 8, 14, 15, 21, 22, 26, 28, 29):
        daily = Daily_Stamp(
            date=datetime(2020, 11, d), 
            status='stamped', habit=habit_draw, member=sophie,
        )
        db.session.add(daily)
        
for d in range(30):
    if d not in (1, 7, 8, 14, 15, 21, 22, 23, 24, 25, 29):
        daily1 = Daily_Stamp(
            date=datetime(2020, 11, d), 
            status='stamped', habit=habit_hair, member=sophie,
        )
        daily2 = Daily_Stamp(
            date=datetime(2020, 11, d), 
            status='stamped', habit=habit_dress, member=sophie,
        )
        db.session.add(daily1)
        db.session.add(daily2)


colors = {
    "fiery-rose":         "#ff5964ff",
    "wild-orchid":        "#d66ba0ff",
    "cyclamen":           "#e87ea1ff",
    "antique-brass":      "#dc9e82ff",
    "melon":              "#ebb3a9ff",
    "gold-crayola":       "#dcc48eff",
    "dutch-white":        "#f4e4baff",
    "beige":              "#f2f3d9ff",
    "tea-green":          "#c2d8b9ff",
    "granny-smith-apple": "#b0f2b4ff",
    "magic-mint":         "#9df7e5ff",
    "blizzard-blue":      "#b8f3ffff",
    "wisteria":           "#b49fccff",
    "african-violet":     "#b07bacff",
    "vivid-burgundy":     "#a5243dff",
    "cedar-chest":        "#be5a38ff",
    "sandy-brown":        "#f29e4cff",
    "maize-crayola":      "#f1c453ff",
    "corn":               "#efea5aff",
    "inchworm":           "#b9e769ff",
    "light-green":        "#83e377ff",
    "medium-aquamarine":  "#16db93ff",
    "keppel":             "#0db39eff",
    "middle-blue":        "#8ac6d0ff",
    "cadet-blue":         "#58a4b0ff",
    "blue-munsell":       "#048ba8ff",
    "sapphire-blue":      "#2c699aff",
    "dark-slate-blue":    "#54478cff",
    "red-violet-crayola": "#af4d98ff",
}

for color, hex in colors.items():
    reward = Reward(type='color',
                    reward=f"Color: {color}",
                    description=f"Gain access to the '{color}' color theme!",
                    cost=7,
                    color={hex},
                    limit_per_member=1,
                    quantity=-1, 
                    stamp=palette,
    )
    db.session.add(reward)

reward = Reward(type='custom',
                    reward=f"{cookie} Cookie",
                    description=f"One giant {cookie.lower()} cookie.",
                    cost=7,
                    color="#be5a38ff",
                    limit_per_member=-1,
                    quantity=-1, 
                    stamp=cookie,
                    program=program_mom,
                    creator=mom,
)
db.session.add(reward)

cookies = ["Chocolate Chip", "Sugar", "Mint", "Peanut Butter"]
for cookie in cookies:
    reward = Reward(type='custom',
                    reward=f"{cookie} Cookie",
                    description=f"One giant {cookie.lower()} cookie.",
                    cost=7,
                    color="#be5a38ff",
                    limit_per_member=-1,
                    quantity=-1, 
                    stamp=cookie,
                    program=program_mom,
                    creator=mom,
    )
    db.session.add(reward)

db.session.commit()