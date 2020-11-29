import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import '../styles/layouts.css'

export default function CalendarMap () {
    const [calendarData, setCalendarData] = useState([])
    const { hid, mid } = useParams()
    useEffect(() => {
        (async () => {
            let dataFetch = await fetch(`/api/habits/${hid}/calendar/${mid}`)
            const resObj = await dataFetch.json()
            console.log("CALENDER RESPONSE", resObj)
            setCalendarData(resObj)
        })()
    }, [])

    if (!calendarData.startDate) return null;

    return (
        <div className='calendarContainer'>
            <CalendarHeatmap
            startDate={new Date(calendarData.startDate)}
            endDate={new Date(calendarData.endDate)}
            values={calendarData.values}
            showWeekdayLabels={true}
            // showOutOfRangeDays={true}
            // titleForValue={value => {
            //     return value
            // }}

            tooltipDataAttrs={value => {
                if (value.date) {
                    return { 'data-tip': `${value.date}`}
                }
                return ""
            }}
            />
            <ReactTooltip />
        </div>
    )
}
