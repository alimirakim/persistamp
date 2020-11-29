import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '../styles/layouts.css'

export default function CalendarMap () {

    return (
        <div className='calendarContainer'>
            <CalendarHeatmap
            startDate={new Date('2016-01-01')}
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
