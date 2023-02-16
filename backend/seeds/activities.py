from backend.models import db, Activity
from datetime import datetime

def seed_activities():

    activity_1 = Activity(title="Code",
                          description="code once a day keeps the doctor away.. ",
                          frequency=7,
                          color_id=2,
                          icon_id=19,
                          program_id=1,
                          creator_id=1,
                          created_at=datetime(2022, 2, 1),
                          )
    activity_2 = Activity(title="Team Meetings",
                          description="meet with team to discuss project",
                          frequency=5,
                          color_id=6,
                          icon_id=1,
                          program_id=1,
                          creator_id=1,
                          created_at=datetime(2022, 2, 4),
                          )
    activity_3 = Activity(title="Spot",
                            description="take spot to the park",
                            frequency=4,
                            color_id=3,
                            icon_id=24,
                            program_id=2,
                            creator_id=1,
                            created_at=datetime(2022, 2, 27),
                            )
    activity_4 = Activity(title="Date Night",
                            description="love is in the air",
                            frequency=1,
                            color_id=16,
                            icon_id=13,
                            program_id=2,
                            creator_id=1,
                            created_at=datetime(2022, 2, 18),
                            )
    activity_5 = Activity(title="Gameday!",
                              description="we're winning it this year",
                              frequency=1,
                              color_id=17,
                              icon_id=14,
                              program_id=2,
                              creator_id=1,
                              created_at=datetime(2022, 2, 11),
                              )
    activity_6 = Activity(title="Dishes",
                            description="you promised",
                            frequency=7,
                            color_id=22,
                            icon_id=3,
                            program_id=3,
                            creator_id=1,
                            created_at=datetime(2022, 2, 17),
                            )
    activity_7 = Activity(title="Drive Sara to practice",
                            description="5:30 at Palmer Field",
                            frequency=3,
                            color_id=18,
                            icon_id=12,
                            program_id=3,
                            creator_id=1,
                            created_at=datetime(2022, 2, 5),
                            )
    activity_8 = Activity(title="Exercise/Gym",
                              description="don't forget leg day",
                              frequency=3,
                              color_id=5,
                              icon_id=16,
                              program_id=3,
                              creator_id=1,
                              created_at=datetime(2022, 2, 20),
                              )

    activities = [
      activity_1, 
      activity_2, 
      activity_3, 
      activity_4, 
      activity_5,
      activity_6, 
      activity_7, 
      activity_8
    ]

    for activity in activities:
        db.session.add(activity)

    db.session.commit()

def undo_activities():
    db.session.execute('TRUNCATE activities CASCADE;')
    db.session.execute('ALTER SEQUENCE activities_id_seq RESTART WITH 1')
    db.session.commit()
