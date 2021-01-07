from dotenv import load_dotenv
load_dotenv()

from datetime import date, timedelta, datetime
from random import *
from calendar import monthrange

from app import app, db
from app.models import User, Program, Habit, Color, Icon, Stamp, Membership, Reward


with app.app_context():
    db.drop_all()
    db.create_all()

    # icons = {
    #   "symbols": [""],
    #   "animals": [""],
    #   "people": [""],
    #   "food": [""],
    #   "things": [""],
    #   "other": [""],
    #   "body": [""],
    # }

    users = [""]
    icon_sets = {
        "defaults": ["user-circle", "calendar-alt", "check-circle", "award", "cogs", "clipboard-check", "medal"],
        "symbols": ["heart", "star"],
        "things": ["palette", "dice", "car-alt", "chess-queen", "basketball-ball", "bowling-ball", "dumbbell", "guitar", "key", "laptop", "pencil-alt", "pen-alt"],
        "people": [],
        "body": ["tooth", "biking"],
        "animals": ["dog", "cat"],
        "food": ["carrot", "cookie", "bacon", "ice-cream"],
    }

    icons = []
    for type, titles in icon_sets.items():
        [icons.append(Icon(type=type, title=title)) for title in titles]
    for icon in icons:
        db.session.add(icon)


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
        "white":              "#ffffff",
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
        "grey":               "#808080",
        "black":              "#000000",
    }
    colors = []
    for title, hex in darkmode_colors.items():
        color = Color(title=title,
                      hex=hex,
                      mode="dark",
        )
        colors.append(color)
        db.session.add(color)

    for title, hex in lightmode_colors.items():
        color = Color(title=title,
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
                  hashed_password="pbkdf2:sha256:150000$vCX0hKgt$29bfb9894101cb9b426a40b4f4d7c4f22011aca3eb2494fc66235fe81e74762c",
                  color=colors[1],
                  icon=icons[0],
                  birthday=datetime(1991, 6, 27)
    )
    dyclee = User(username="dyclee",
                  first_name="David",
                  last_name="Lee",
                  email="fakedavid@gmail.com",
                  hashed_password="pbkdf2:sha256:150000$vCX0hKgt$29bfb9894101cb9b426a40b4f4d7c4f22011aca3eb2494fc66235fe81e74762c",                  color=colors[2],
                  icon=icons[0],
                  birthday=datetime(1994, 8, 18)
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
                  birthday=datetime(1993, 4, 4)
    )
    aly = User(username="Aly Cat",
                  first_name="Aly",
                  last_name="Cat",
                  email="fakeali@gmail.com",
                  hashed_password="pbkdf2:sha256:150000$vCX0hKgt$29bfb9894101cb9b426a40b4f4d7c4f22011aca3eb2494fc66235fe81e74762c",
                  color=colors[7],
                  icon=icons[0],
                  birthday=datetime(1994, 3, 3)
    )
    sophie = User(username="sophie",
                  first_name="Sophia",
                  last_name="S.",
                  email="sophie@gmail.com",
                  hashed_password="pbkdf2:sha256:150000$vCX0hKgt$29bfb9894101cb9b426a40b4f4d7c4f22011aca3eb2494fc66235fe81e74762c",
                  color=colors[8],
                  icon=icons[0],
                  birthday=datetime(1995, 2, 2)
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
                  birthday=datetime(1989, 11, 19),
    )
    demo = User(username="TheDemoUser1",
                  first_name="Demo",
                  last_name="User",
                  email="demo@gmail.com",
                  hashed_password="pbkdf2:sha256:150000$vCX0hKgt$29bfb9894101cb9b426a40b4f4d7c4f22011aca3eb2494fc66235fe81e74762c",
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
                        created_at=datetime(2019, 12, 1),
    )
    program_two = Program(title="Social",
                        description="family and friends",
                        color=colors[22],
                        creator_id=9,
                        icon_id=8,
                        created_at=datetime(2019, 12, 15),
    )
    program_three = Program(title="Chores and errands",
                        description="just do it",
                        color=colors[11],
                        creator_id=9,
                        icon_id=6,
                        created_at=datetime(2019, 12, 31),
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
    programs = [program_one, program_two, program_three, program_mom, program_me, program_ashe]

    for program in programs:
        db.session.add(program)

    db.session.commit()

    # Habits
    habit_workone = Habit(habit="Code",
                    description="code once a day keeps the doctor away.. ",
                    frequency=7,
                    color=colors[1],
                    icon_id=19,
                    program=program_one,
                    creator=demo,
                    created_at=datetime(2019, 12, 1),
                    )
    habit_worktwo = Habit(habit="Team Meetings",
                    description="meet with team to discuss project",
                    frequency=5,
                    color=colors[5],
                    icon_id=1,
                    program=program_one,
                    creator=demo,
                    created_at=datetime(2020, 1, 4),
                    )
    habit_socialone = Habit(habit="Spot",
                    description="take spot to the park",
                    frequency=4,
                    color=colors[2],
                    icon_id=24,
                    program=program_two,
                    creator=demo,
                    created_at=datetime(2020, 5, 29),
                    )
    habit_socialtwo = Habit(habit="Date Night",
                    description="love is in the air",
                    frequency=1,
                    color=colors[15],
                    icon_id=13,
                    program=program_two,
                    creator=demo,
                    created_at=datetime(2020, 2, 18),
                    )
    habit_socialthree = Habit(habit="Gameday!",
                    description="we're winning it this year",
                    frequency=1,
                    color=colors[16],
                    icon_id=14,
                    program=program_two,
                    creator=demo,
                    created_at=datetime(2020, 11, 11),
                    )
    habit_choresone = Habit(habit="Dishes",
                    description="you promised",
                    frequency=7,
                    color=colors[21],
                    icon_id=3,
                    program=program_three,
                    creator=demo,
                    created_at=datetime(2020, 8, 17),
                    )
    habit_chorestwo = Habit(habit="Drive Sara to practice",
                    description="5:30 at Palmer Field",
                    frequency=3,
                    color=colors[17],
                    icon_id=12,
                    program=program_three,
                    creator=demo,
                    created_at=datetime(2020, 7, 5),
                    )
    habit_choresthree = Habit(habit="Exercise/Gym",
                    description="don't forget leg day",
                    frequency=3,
                    color=colors[4],
                    icon_id=16,
                    program=program_three,
                    creator=demo,
                    created_at=datetime(2019, 12, 31),
                    )
    habit_veggies = Habit(habit="Eat Veggies",
                    description="",
                    frequency="ttttttt",
                    color=colors[16],
                    icon=icons[11],
                    program=program_mom,
                    creator=mom,
    )
    habit_dog = Habit(habit="Walk Bentley",
                    description="",
                    frequency="ttttttt",
                    color=colors[13],
                    icon=icons[9],
                    program=program_mom,
                    creator=mom,
    )
    habit_teeth = Habit(habit="Brush Teeth",
                    description="",
                    frequency="ttttttt",
                    color=colors[10],
                    icon=icons[7],
                    program=program_mom,
                    creator=mom,
    )
    habit_hair = Habit(habit="brush hair",
                    description="",
                    frequency="ttttttt",
                    color=colors[2],
                    icon=icons[4],
                    program=program_me,
                    creator=sophie,
    )
    habit_dress = Habit(habit="wear a pretty dress",
                    description="",
                    frequency="ttttttt",
                    color=colors[2],
                    icon=icons[4],
                    program=program_me,
                    creator=sophie,
    )
    habit_draw = Habit(habit="draw a picture",
                    description="",
                    frequency="tffffft",
                    color=colors[2],
                    icon=icons[6],
                    program=program_me,
                    creator=sophie,
    )
    habit_play = Habit(habit="play with Ashe",
                    description="",
                    frequency="tffffft",
                    color=colors[2],
                    icon=icons[4],
                    program=program_me,
                    creator=sophie,
    )
    habit_win = Habit(habit="win at mario kart",
                    description="",
                    frequency="tffffft",
                    color=colors[18],
                    icon=icons[5],
                    program=program_ashe,
                    creator=ashe,
    )
    habits = [habit_workone, habit_worktwo, habit_socialone, habit_socialtwo, habit_socialthree,
        habit_choresone, habit_chorestwo, habit_choresthree, habit_dog, habit_draw, habit_dress,
        habit_hair, habit_play, habit_teeth, habit_veggies, habit_win]

    for habit in habits:
        db.session.add(habit)

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
        program=program_me, member=sophie, stamper=sophie,points=13,
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
                    status='stamped', habit=habit_teeth, membership=member_sophie1,
                )
                db.session.add(stamp)

    # randomlist = []
    # for i in range(0,5):
    # n = random.randint(1,30)
    # randomlist.append(n)
    # print(randomlist)
    # habits = [habit_workone, habit_worktwo, habit_socialone, habit_socialtwo, habit_socialthree,
    #     habit_choresone, habit_chorestwo, habit_choresthree, habit_dog, habit_draw, habit_dress,
    #     habit_hair, habit_play, habit_teeth, habit_veggies, habit_win]

# Total_number_days = monthrange(2020, 2)[1]
# print("\nTotal Number of Days in a Month: ",Total_number_days)
    def createStamps(habit, membership, month, year, missedDays):
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
                    habit=habit,
                    membership_id=membership
                )
                db.session.add(stamp)
        db.session.commit()

    createStamps(habit_workone, 1, 12, 2019, 4)
    createStamps(habit_workone, 1, 1, 2020, 1)
    createStamps(habit_workone, 1, 2, 2020, 3)
    createStamps(habit_workone, 1, 3, 2020, 0)
    createStamps(habit_workone, 1, 4, 2020, 2)
    createStamps(habit_workone, 1, 5, 2020, 4)
    createStamps(habit_workone, 1, 6, 2020, 6)
    createStamps(habit_workone, 1, 7, 2020, 8)
    createStamps(habit_workone, 1, 8, 2020, 7)
    createStamps(habit_workone, 1, 9, 2020, 4)
    createStamps(habit_workone, 1, 10, 2020, 3)
    createStamps(habit_workone, 1, 11, 2020, 1)

    createStamps(habit_worktwo, 1, 1, 2020, 12)
    createStamps(habit_worktwo, 1, 2, 2020, 10)
    createStamps(habit_worktwo, 1, 3, 2020, 8)
    createStamps(habit_worktwo, 1, 4, 2020, 9)
    createStamps(habit_worktwo, 1, 5, 2020, 11)
    createStamps(habit_worktwo, 1, 6, 2020, 18)
    createStamps(habit_worktwo, 1, 7, 2020, 20)
    createStamps(habit_worktwo, 1, 8, 2020, 17)
    createStamps(habit_worktwo, 1, 9, 2020, 15)
    createStamps(habit_worktwo, 1, 10, 2020, 15)
    createStamps(habit_worktwo, 1, 11, 2020, 17)

    createStamps(habit_socialone, 2, 6, 2020, 13)
    createStamps(habit_socialone, 2, 7, 2020, 14)
    createStamps(habit_socialone, 2, 8, 2020, 18)
    createStamps(habit_socialone, 2, 9, 2020, 15)
    createStamps(habit_socialone, 2, 10, 2020, 25)
    createStamps(habit_socialone, 2, 11, 2020, 24)

    createStamps(habit_socialtwo, 2, 2, 2020, 26)
    createStamps(habit_socialtwo, 2, 3, 2020, 25)
    createStamps(habit_socialtwo, 2, 4, 2020, 26)
    createStamps(habit_socialtwo, 2, 5, 2020, 25)
    createStamps(habit_socialtwo, 2, 6, 2020, 25)
    createStamps(habit_socialtwo, 2, 7, 2020, 25)
    createStamps(habit_socialtwo, 2, 8, 2020, 24)
    createStamps(habit_socialtwo, 2, 9, 2020, 24)
    createStamps(habit_socialtwo, 2, 10, 2020, 25)
    createStamps(habit_socialtwo, 2, 11, 2020, 26)

    gamedays = [8, 15, 20, 22, 29]
    for day in gamedays:
        stamp = Stamp(
            date=date(2020, 11, day),
            status='stamped', habit=habit_socialthree, membership_id=2,
        )
        db.session.add(stamp)
        db.session.commit()


    createStamps(habit_choresone, 3, 8, 2020, 10)
    createStamps(habit_choresone, 3, 9, 2020, 6)
    createStamps(habit_choresone, 3, 10, 2020, 3)
    createStamps(habit_choresone, 3, 11, 2020, 0)

    # July 5/2020
    startHabitDate = date(2020, 7, 5)
    while startHabitDate < date.today():
        weekdays = ["Monday", "Wednesday", "Friday"]
        if startHabitDate.strftime("%A") in weekdays:
            newStamp = Stamp(
                date=startHabitDate.strftime("%Y-%m-%d"),
                status='stamped',
                habit=habit_chorestwo,
                membership_id=3,
            )
            db.session.add(newStamp)
            db.session.commit()
        startHabitDate += timedelta(days=1)

    createStamps(habit_choresthree, 3, 1, 2020, 5)
    createStamps(habit_choresthree, 3, 2, 2020, 13)
    createStamps(habit_choresthree, 3, 3, 2020, 14)
    createStamps(habit_choresthree, 3, 4, 2020, 19)
    createStamps(habit_choresthree, 3, 5, 2020, 20)
    createStamps(habit_choresthree, 3, 6, 2020, 17)
    createStamps(habit_choresthree, 3, 7, 2020, 14)
    createStamps(habit_choresthree, 3, 8, 2020, 10)
    createStamps(habit_choresthree, 3, 9, 2020, 12)
    createStamps(habit_choresthree, 3, 10, 2020, 13)
    createStamps(habit_choresthree, 3, 11, 2020, 10)

    for d in range(1, 30):
        if d in (1, 7, 8, 14, 15, 21, 22, 26, 28, 29):
            stamp = Stamp(
                date=date(2020, 11, d),
                status='stamped', habit=habit_draw, membership=member_sophie2,
            )
            db.session.add(stamp)
    for d in range(1, 30):
        if d in (1, 3, 4, 14, 17, 20, 22, 28, 26):
            stamp = Stamp(
                date=date(2020, 10, d),
                status='stamped', habit=habit_draw, membership=member_sophie2,
            )
            db.session.add(stamp)
    for d in range(1, 30):
        if d in (1, 4, 7):
            stamp = Stamp(
                date=date(2020, 8, d),
                status='stamped', habit=habit_draw, membership=member_sophie2,
            )
            db.session.add(stamp)

    for d in range(1, 30):
        if d not in (1, 7, 8, 14, 15, 21, 22, 23, 24, 25, 29):
            print("\nDATE", d)
            print(datetime(2020, 11, d))
            stamp1 = Stamp(
                date=date(2020, 11, d),
                status='stamped', habit=habit_hair, membership=member_sophie2,
            )
            stamp2 = Stamp(
                date=date(2020, 11, d),
                status='stamped', habit=habit_dress, membership=member_sophie2,
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
