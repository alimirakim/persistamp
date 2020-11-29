import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '../styles/layouts.css'

export default function CalendarMap () {
    const [calendarData, setCalendarData] = useState()
    const { hid, mid } = useParams()
    useEffect(() => {
        (async () => {
            let dataFetch = await fetch(`/api/habits/${hid}/calendar/${mid}`)
            const resObj = await dataFetch.json()
            console.log("CALENDER RESPONSE", resObj)
        })()
    })
    return (
        <div className='calendarContainer'>
            <CalendarHeatmap
            startDate={new Date('2015-11-01')}
            endDate={new Date('2016-04-01')}
            values={[
              { date: '2016-01-01' },
              { date: '2016-01-22' },
              { date: '2016-01-30' },
              // ...and so on
            ]}
            />

        </div>
    )
}
