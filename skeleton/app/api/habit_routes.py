from flask import Blueprint, render_template, redirect, jsonify, request
from sqlalchemy.orm import joinedload
from app.models import db, User, Program, Habit, Member, DailyStamp
from app.schemas import user_schema, program_schema, habit_schema, member_schema, dailystamp_schema, color_schema, stamp_schema
from app.utils import dump_data_list
from app.forms import HabitForm
from flask_login import current_user
from datetime import date, timedelta, datetime
import calendar
from flask_login import current_user



habit_routes = Blueprint("habits", __name__)


# TESTED Functions
@habit_routes.route("/programs/<int:pid>")
def program_habits(pid):
    """Get a list of a program's habits."""
    habits = Habit.query.filter(Habit.program_id == pid).all()
    return jsonify(dump_data_list(habits, habit_schema))


# @habit_routes.route("/programs/<int:pid>/members/<int:mid>/current_week")
# def current_week(pid, mid):
#     """Get the past 7 days"""
#     current_date = date.today()
#     past_week = [(current_date - timedelta(days=i)) for i in range(7)]
#     past_week = [(day.strftime('%A')[0:3], day.strftime('%Y-%m-%d')) for day in past_week]

#     program = Program.query.get(pid)
#     program = program_schema.dump(program)
#     habit_stamps = []
#     # print("\nPROGRAM", program)
#     # print("habit", program["habits"][0])
#     for habit in program["habits"]:
#       habit_stamps.append(DailyStamp.query.filter( \
#         DailyStamp.habit_id == habit, \
#         DailyStamp.member_id == mid, \
#         DailyStamp.date <= past_week[0][1], \
#         DailyStamp.date >= past_week[6][1]).all())
#     habit_stamps = [dump_data_list(h, dailystamp_schema) for h in habit_stamps]
#     # print("HABIT STAMPS", habit_stamps)
#     return jsonify(past_week=past_week, dailies=habit_stamps)


@habit_routes.route("<int:hid>/member/<int:mid>/current_week")
def current_week(hid, mid):
    """Get the past 7 days"""
    current_date = date.today()
    past_week = [(current_date - timedelta(days=i)) for i in range(7)]
    past_week_days = [day.strftime('%A')[0:3] for day in past_week]
    past_week_dates = [date.strftime('%Y-%m-%d') for date in past_week]
    print('past_week_days: ', past_week)
    print('past_week_dates: ', past_week_dates)
    stamps = DailyStamp.query.filter(DailyStamp.habit_id == hid, DailyStamp.member_id == mid, DailyStamp.date <= past_week_dates[0], DailyStamp.date >= past_week_dates[6]).all()
    return jsonify(days=past_week_days, dates=past_week_dates, stamps=[dailystamp_schema.dump(stamp) for stamp in stamps])

# fetch(`/api/habits/${hid}/members/${mid}/graph/${toggleTime}`

@habit_routes.route("<int:hid>/members/<int:mid>/graph/<string:interval>")
def getWeeklyGraph(hid, interval, mid):
    # uid = current_user.id
    habitObj = Habit.query.filter(Habit.id == hid).one()
    habit = habit_schema.dump(habitObj)
    current_date = date.today()
    # print("CURRENT_DATE =-----------------------------------------------", current_date)

    if interval == "Monthly":
        currentStrDate = current_date.strftime("%Y-%m-%d")
        splitDate = currentStrDate.split("-")
        lastYear = int(splitDate[0]) - 1
        lastDate = date(lastYear, int(splitDate[1]), int(splitDate[2]))
        habitHistory = DailyStamp.query.filter(DailyStamp.habit_id == hid, DailyStamp.member_id == mid, DailyStamp.date >= lastDate).all()
        stamps = [dailystamp_schema.dump(stamp)["date"] for stamp in habitHistory]

        monthDict = {month: index for index, month in enumerate(calendar.month_abbr) if month}

        monthAxisLabels = {}
        for month in monthDict.keys():
            monthAxisLabels[month] = 0

        for stamp in stamps:
            dateSplit = stamp.split('-')
            stampMonthNum = int(dateSplit[1])
            for month, monthNum in monthDict.items():
                if stampMonthNum == monthNum:
                    monthAxisLabels[month] += 1
                continue
        # print("MONTH AXIS LABELS", monthAxisLabels)
        data = []
        for month, stampCount in monthAxisLabels.items():
            data.append({ "dates": month, "stamps": stampCount })
            continue
        for i in range(12):
            lastMonth = data.pop(-1)
            if lastMonth["dates"] != current_date.strftime('%b'):
                data.insert(0, lastMonth)
                continue
            data.append(lastMonth)
            break

        # print("MONTH DATA ------------", data)
        ticks = [0,5,10,15,20,25,30,35]
        yDomain = [0,35]
        jsonData = jsonify(data=data, habit=habit, ticks=ticks, yDomain=yDomain)
        return jsonData

    past_fourteen_weeks = [(current_date - timedelta(days=i)) for i in range(98)]
    past_week_dates = [date.strftime('%Y-%m-%d') for date in past_fourteen_weeks]
    axisLabels = []
    i = 0
    for each in range(14):
        xdate = past_fourteen_weeks[i].strftime("%b %d")
        xday = int(xdate.split(' ')[-1])
        xmonth = xdate.split(' ')[0]
        if xday < 8:
            axisLabels.append(xmonth)
            i += 7
            continue
        axisLabels.append(xday)
        i += 7
    newAxisLabels = list(reversed(axisLabels))

    daily_stamps = DailyStamp.query.filter(DailyStamp.habit_id == hid, DailyStamp.member_id == mid, DailyStamp.date <= past_week_dates[0], DailyStamp.date >= past_week_dates[-1]).all()
    stamps = [dailystamp_schema.dump(stamp)["date"] for stamp in daily_stamps]

    isStamped = []
    for each in past_week_dates:
        if each in stamps:
            isStamped.append(True)
            continue
        isStamped.append(False)

    data = []
    i = 13
    for week in range(14):
        count = 0
        for day in range(7):
            checkDay = isStamped.pop(0)
            # print("CHECK DAY:   ---------------------------", checkDay)
            if checkDay == True:
                count += 1
        obj = {"dates": newAxisLabels.pop(-1), "stamps": count }
        data.append(obj)
        i -= 1
    ticks = [0,1,2,3,4,5,6,7]
    yDomain = [0, 7]
    newData = list(reversed(data))
    jsonData = jsonify(data=newData, habit=habit, ticks=ticks, yDomain=yDomain)
    return jsonData

@habit_routes.route("<int:hid>/calendar/<int:mid>")
def calendarData(hid, mid):
    current_date = date.today()
    endDate = current_date.strftime("%Y-%m-%d")

    splitDate = endDate.split("-")
    # firstDayStr = f'{splitDate[0]}-{splitDate[1]}-01'
    firstDayOfMonth = date(int(splitDate[0]), int(splitDate[1]), 1)

    startDate = None
    for i in range(6):
        start = firstDayOfMonth - timedelta(days=128-i)
        if start.isoweekday() == 7:
            startDate = start.strftime("%Y-%m-%d")
            break
    # print("GETTING SUNDAY============================", startDate)

    values = []
    dailystamps = DailyStamp.query.filter(DailyStamp.habit_id == hid, DailyStamp.member_id == mid, DailyStamp.date >= startDate, DailyStamp.date <= endDate).all()
    # print("DAILY STAMPS FOR CALENDAR ____________________________", dailystamps)
    for each in dailystamps:
        stampdata = dailystamp_schema.dump(each)
        values.append({ "date": stampdata["date"]})
    # print("VALUES ------------------------", values)

    jsonData = jsonify(values=values, startDate=startDate, endDate=endDate)
    return jsonData
    
    
@habit_routes.route("/<int:hid>/members/<int:mid>")
def habit_details(hid, mid):
    """Get a habit's details, including recent history."""
    # TODO Ask TA how to filter joinedload to only return dailystamps of 'member id blah', and filter attributes for each joinedload.
    habit = Habit.query.filter(Habit.id == hid).options( \
      joinedload(Habit.color), \
      joinedload(Habit.stamp), \
      joinedload(Habit.program), \
      joinedload(Habit.creator), \
      joinedload(Habit.daily_stamps)) \
      .one()
    habit_data = habit_schema.dump(habit)
    habit_data["color"] = color_schema.dump(habit.color)
    habit_data["stamp"] = stamp_schema.dump(habit.stamp)
    habit_data["program"] = program_schema.dump(habit.program)
    habit_data["creator"] = user_schema.dump(habit.creator)
    habit_data["daily_stamps"] = dailystamp_schema.dump([stamp for stamp in habit.daily_stamps if stamp.member_id == mid])
    print("\nSINGLE HABIT DATA", habit_data)
    return jsonify(habit_data)


@habit_routes.route("/edit/<int:hid>", methods=["PATCH"])
def edit_habit(hid):
    """Edit a habit's details by id."""
    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        habit = Habit.query.get(hid)
        habit.habit = form.data['habit']
        habit.description = form.data['description']
        habit.frequency = form.data['frequency']
        habit.color_id = form.data['color']
        habit.stamp_id = form.data['stamp']
        db.session.commit()
        print("\nEDITED", habit)

        habit_data = habit_schema.dump(habit)
        habit_data["color"] = color_schema.dump(habit.color)
        habit_data["stamp"] = stamp_schema.dump(habit.stamp)
        print("\nEDITTED HABIT DUMP", habit_data)
        return jsonify(habit_data)
    return "Habit-edit fail :["


@habit_routes.route("/delete/<int:hid>", methods=["DELETE"])
def delete_habit(hid):
    """Delete a habit by id."""
    habit = Habit.query.get(hid)
    db.session.delete(habit)
    db.session.commit()
    return "Habit is donezo~!"


@habit_routes.route("/<int:hid>/programs/<int:pid>/members/<int:mid>/days/<day>", methods=["delete", "post"])
def stamp_day(pid, mid, hid, day):
    """Change the status of a daily_stamp to 'stamped' or 'pending'."""
    print("\n\n\n\n\npid mid hid day", pid, mid, hid, day, request.method)
    member = Member.query.get(mid)
    # day = date
    if request.method == "POST":
        print("\n\nPOSTING")
        member = Member.query.get(mid)
        stamp = DailyStamp.query.join(Member.daily_stamps).filter( \
            DailyStamp.habit_id == hid,  \
            DailyStamp.member_id == mid, \
            DailyStamp.date == day) \
            .options(joinedload(DailyStamp.member)).one_or_none()
        print("\nSTAMP", stamp)
        if not stamp:
            if member.member_id == member.stamper_id:
                stamp = DailyStamp( date=day,
                                    status='stamped',
                                    habit_id=hid,
                                    member_id=mid,)
            else:
                stamp = DailyStamp( date=day,
                                    status='pending',
                                    habit_id=hid,
                                    member_id=mid,)
            print("\nnew stampy!", stamp)
            db.session.add(stamp)
        else:
            if stamp.status == 'pending' and current_user.id == stamp.member.stamper_id:
                stamp.status = 'stamped'
        print("\n\nMADE IT to the end!!")
        if stamp.status == 'stamped':
            member.points += 1
        db.session.commit()
        return jsonify(dailystamp_schema.dump(stamp))
    elif request.method == "DELETE":
        print("\n\nDELETING?")
        stamp = DailyStamp.query.filter( \
            DailyStamp.habit_id == hid,  \
            DailyStamp.member_id == mid, \
            DailyStamp.date == day).one_or_none()
        print("stamp", stamp)
        db.session.delete(stamp)
        member.points -= 1
        db.session.commit()
        
        return jsonify("Stampy deleted :C ")


@habit_routes.route("/programs/<int:pid>/create", methods=["POST"])
def create_habit(pid):
    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        newHabit = Habit(
            habit=form.data['habit'],
            description=form.data['description'],
            frequency=str(form.data['frequency']),
            color_id=form.data['color'],
            stamp_id=form.data['stamp'],
            creator_id=request.json['userId'],
            program_id=pid,
        )
        db.session.add(newHabit)
        print(newHabit)
        db.session.commit()
        newHabit = Habit.query.options(joinedload(Habit.stamp), joinedload(Habit.color)).get(newHabit.id)
        habit = habit_schema.dump(newHabit)

        habit["color"] = color_schema.dump(newHabit.color)
        habit["stamp"] = stamp_schema.dump(newHabit.stamp)
        print("\n\nNEW HABIT DICTIONARY:", habit)
        return jsonify(habit)
    return "Habit failure"
