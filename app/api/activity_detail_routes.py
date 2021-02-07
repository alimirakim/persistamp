
from flask import Blueprint, jsonify, request
from sqlalchemy.orm import joinedload
from app.models import db, Activity, Stamp
from app.schemas import activity_schema, stamp_schema
from app.utils import validation_errors_to_error_messages
from flask_login import current_user
from datetime import date, timedelta, datetime
import calendar

activity_detail_routes = Blueprint("activity_details", __name__, url_prefix="/activity-details")


@activity_detail_routes.route("<int:aid>/memberships/<int:mid>/graph/<string:interval>")
def getWeeklyGraph(aid, interval, mid):
    # uid = current_user.id
    activityObj = Activity.query.filter(Activity.id == aid).one()
    activity = activity_schema.dump(activityObj)
    current_date = date.today()
    # print("CURRENT_DATE =-----------------------------------------------", current_date)

    if interval == "Monthly":
        currentStrDate = current_date.strftime("%Y-%m-%d")
        splitDate = currentStrDate.split("-")
        lastYear = int(splitDate[0]) - 1

        if int(splitDate[1]) == 12:
            lastDate = date(int(splitDate[0]), 1, int(splitDate[2]))
        else:
            lastDate = date(lastYear, int(splitDate[1]) + 1, int(splitDate[2]))
        activityHistory = Stamp.query.filter(Stamp.activity_id == aid, Stamp.membership_id == mid, Stamp.date >= lastDate).all()
        stamps = [stamp_schema.dump(stamp)["date"] for stamp in activityHistory]

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
        jsonData = jsonify(data=data, activity=activity, ticks=ticks, yDomain=yDomain)
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

    stamps = Stamp.query.filter(Stamp.activity_id == aid, Stamp.membership_id == mid, Stamp.date <= past_week_dates[0], Stamp.date >= past_week_dates[-1]).all()
    stamps = [stamp_schema.dump(stamp)["date"] for stamp in stamps]

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
    jsonData = jsonify(data=newData, activity=activity, ticks=ticks, yDomain=yDomain)
    return jsonData


@activity_detail_routes.route("<int:aid>/calendar/<int:mid>")
def getCalendarData(aid, mid):
    current_date = date.today()
    endDate = current_date.strftime("%Y-%m-%d")

    splitDate = endDate.split("-")
    # firstDayStr = f'{splitDate[0]}-{splitDate[1]}-01'
    firstDayOfMonth = date(int(splitDate[0]), int(splitDate[1]), 1)

    startDate = None
    startObj = None
    for i in range(7):
        start = firstDayOfMonth - timedelta(days=100-i)
        if start.isoweekday() == 7:
            startDate = start.strftime("%Y-%m-%d")
            startObj = start
            break
    # print("GETTING SUNDAY============================", startDate)
    stampDates = []
    values = []
    stamps = Stamp.query.filter(Stamp.activity_id == aid, \
        Stamp.membership_id == mid, \
        Stamp.date >= startDate, \
        Stamp.date <= endDate).all()

    for each in stamps:
        stampdata = stamp_schema.dump(each)
        values.append({ "date": stampdata["date"]})
        stampDates.append(stampdata["date"])

    xLabels = ["S", "M", "T", "W", "T", "F", "S"]
    yLabels = []
    yLabels.append(startObj.strftime("%b"))
    yArr = [[]]

    yArrIndex = 0

    while startObj <= current_date:
        print("\nday", startObj.strftime("%d"))
        if startObj.strftime("%Y-%m-%d") in stampDates:
            yArr[yArrIndex].append({"val": 100, "day": startObj.strftime("%d")})
            # dateVals[yArrIndex].append(startObj.strftime("%d").lstrip("0").replace(" 0", " "))
        else:
            yArr[yArrIndex].append({"val": 99, "day": startObj.strftime("%d")})
            # dateVals[yArrIndex].append(startObj.strftime("%d").lstrip("0").replace(" 0", " "))

        if len(yArr[yArrIndex]) == 7:
            yArr.append([])
            yArrIndex += 1
            month = startObj.strftime("%b")
            if month not in yLabels:
                yLabels.append(month)
            else:
                yLabels.append(None)
        startObj += timedelta(days=1)

    while len(yArr[-1]) < 7:
        yArr[-1].append(99)

    if yLabels[-1] == None:
        yLabels.pop(-1)
        if int(date.today().strftime("%d").lstrip("0").replace(" 0", " ")) < 8:
            yLabels.append(date.today().strftime("%b"))
        # else:
            # yLabels.append(date.today().strftime("%d").lstrip("0").replace(" 0", " "))

    # print("XLABELS SWITCH", xLabels)
    # print("YLABELS SWITCH", yLabels)
    # print("Data--------------------------", yArr)
    jsonData = jsonify(values=values, startDate=startDate, endDate=endDate,
            xLabels=xLabels,
            yLabels=yLabels,
            yArr=yArr)
    return jsonData


@activity_detail_routes.route("/<int:aid>/stats/<int:mid>")
def getActivityStats(aid, mid):
    activity = activity_schema.dump(Activity.query.filter(Activity.id == aid).one())
    activityFrequency = activity["frequency"]

    startList = activity["created_at"][0:10].split("-")
    startDate = date(int(startList[0]), int(startList[1]), int(startList[2]))
    oneMonthAgo = date.today() - timedelta(days=31)
    twoMonthsAgo = oneMonthAgo - timedelta(days=31)

    daysOfActivity = (date.today() - startDate).days

    attempts = (int(daysOfActivity) // 7) * int(activityFrequency) + int(activityFrequency)

    allStamps = Stamp.query.filter(Stamp.activity_id == aid, Stamp.membership_id == mid)
    lastMonthStamps = Stamp.query.filter(Stamp.activity_id == aid, Stamp.membership_id == mid, Stamp.date >= oneMonthAgo.strftime("%Y-%m-%d"))
    twoMonthsAgoStamps = Stamp.query.filter(Stamp.activity_id == aid, Stamp.membership_id == mid, Stamp.date < oneMonthAgo.strftime("%Y-%m-%d"), Stamp.date >= twoMonthsAgo.strftime("%Y-%m-%d"))

    def dumpStamps(stamp):
        return stamp_schema.dump(stamp)
    stampObjs = list(map(dumpStamps, allStamps))
    lastMonthObjs = list(map(dumpStamps, lastMonthStamps))
    twoMonthObjs = list(map(dumpStamps, twoMonthsAgoStamps))
    stampedDates = list(map(lambda x: x["date"], stampObjs))

    streakArr = [0]
    checkDate = startDate - timedelta(days=7)
    totalDays = (date.today() - startDate).days + 8

    while totalDays > 0:
        if checkDate.strftime("%Y-%m-%d") in stampedDates:
            streakArr.append(streakArr[-1] + 1)
        else:
            streakArr.append(0)
        totalDays -= 1
        checkDate += timedelta(days=1)
    longestStreak = max(streakArr)
    currentStreak = streakArr[-1]
    # print("LONGEST STREAK _____________", longestStreak)
    total = len(stampObjs)

    scoreFraction = f'{total} / {attempts}'
    score = '{:.1%}'.format(total / attempts)

    monthTrend = None
    monthPercentage = None

    if daysOfActivity <= 31:
        monthTrend = "increase"
        monthPercentage = "n/a"
    elif len(lastMonthObjs) >= len(twoMonthObjs):
        monthTrend = 'increase'
        lastMonth = len(lastMonthObjs)
        lastTwo = len(twoMonthObjs)
        monthPercentage = '{:.1%}'.format((lastMonth - lastTwo) / 31)
    else:
        monthTrend = 'decrease'
        lastMonth = len(lastMonthObjs)
        lastTwo = len(twoMonthObjs)
        monthPercentage = '{:.1%}'.format((lastMonth - lastTwo) / 31)

    # print("MONTH PERCENTAGE", monthPercentage, monthTrend)
    jsonData = jsonify(total=total,
                    score=score,
                    scoreFraction=scoreFraction,
                    monthPercentage=monthPercentage,
                    monthTrend=monthTrend,
                    longestStreak=longestStreak,
                    currentStreak=currentStreak,
                    )
    return jsonData
