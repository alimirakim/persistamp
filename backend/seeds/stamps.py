from backend.models import db, Stamp
from calendar import monthrange
from random import *
from datetime import date, timedelta, datetime

def seed_stamps():
    """This is WIP"""

    def createStamps(activity_id, membership_id, month, year, missedDays):
        maxDays = monthrange(year, month)[1]
        missedList = []
        while len(missedList) < missedDays:
            missedStampDay = randint(1, maxDays)
            if missedStampDay not in missedList:
                missedList.append(missedStampDay)
        for d in range(1, 28):
            if d not in missedList:
                stamp = Stamp(
                    date=date(year, month, d),
                    status='stamped',
                    activity_id=activity_id,
                    membership_id=membership_id
                )
                db.session.add(stamp)
        db.session.commit()

    createStamps(1, 1, 3, 2022, 0)
    createStamps(1, 1, 4, 2022, 2)
    createStamps(1, 1, 5, 2022, 4)
    createStamps(1, 1, 6, 2022, 6)
    createStamps(1, 1, 7, 2022, 8)
    createStamps(1, 1, 8, 2022, 7)
    createStamps(1, 1, 9, 2022, 4)
    createStamps(1, 1, 10, 2022, 3)
    createStamps(1, 1, 11, 2022, 1)

    createStamps(2, 1, 3, 2022, 8)
    createStamps(2, 1, 4, 2022, 9)
    createStamps(2, 1, 5, 2022, 11)
    createStamps(2, 1, 6, 2022, 18)
    createStamps(2, 1, 7, 2022, 20)
    createStamps(2, 1, 8, 2022, 17)
    createStamps(2, 1, 9, 2022, 15)
    createStamps(2, 1, 10, 2022, 15)
    createStamps(2, 1, 11, 2022, 17)

    createStamps(3, 2, 6, 2022, 13)
    createStamps(3, 2, 7, 2022, 14)
    createStamps(3, 2, 8, 2022, 18)
    createStamps(3, 2, 9, 2022, 15)
    createStamps(3, 2, 10, 2022, 25)
    createStamps(3, 2, 11, 2022, 24)

    createStamps(4, 2, 3, 2022, 25)
    createStamps(4, 2, 4, 2022, 26)
    createStamps(4, 2, 5, 2022, 25)
    createStamps(4, 2, 6, 2022, 25)
    createStamps(4, 2, 7, 2022, 25)
    createStamps(4, 2, 8, 2022, 24)
    createStamps(4, 2, 9, 2022, 24)
    createStamps(4, 2, 10, 2022, 25)
    createStamps(4, 2, 11, 2022, 26)

    gamedays = [8, 15, 20, 22, 29]
    for day in gamedays:
        stamp = Stamp(
            date=date(2022, 12, day),
            status='stamped', activity_id=5, membership_id=2,
        )
        db.session.add(stamp)
        db.session.commit()

    createStamps(6, 3, 8, 2022, 10)
    createStamps(6, 3, 9, 2022, 6)
    createStamps(6, 3, 10, 2022, 3)
    createStamps(6, 3, 11, 2022, 0)

    # July 5/2022
    startActivityDate = date(2022, 7, 5)
    while startActivityDate < date.today():
        weekdays = ["Monday", "Wednesday", "Friday"]
        if startActivityDate.strftime("%A") in weekdays:
            newStamp = Stamp(
                date=startActivityDate.strftime("%Y-%m-%d"),
                status='stamped',
                activity_id=7,
                membership_id=3,
            )
            db.session.add(newStamp)
            db.session.commit()
        startActivityDate += timedelta(days=1)

    createStamps(8, 3, 2, 2022, 13)
    createStamps(8, 3, 3, 2022, 14)
    createStamps(8, 3, 4, 2022, 19)
    createStamps(8, 3, 5, 2022, 20)
    createStamps(8, 3, 6, 2022, 17)
    createStamps(8, 3, 7, 2022, 14)
    createStamps(8, 3, 8, 2022, 10)
    createStamps(8, 3, 9, 2022, 12)
    createStamps(8, 3, 10, 2022, 13)
    createStamps(8, 3, 11, 2022, 10)

    db.session.commit()

def undo_stamps():
    db.session.execute('TRUNCATE stamps CASCADE;')
    db.session.execute('ALTER SEQUENCE stamps_id_seq RESTART WITH 1')
    db.session.commit()
