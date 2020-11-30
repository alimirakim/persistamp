import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import CalendarHeatmap from 'react-calendar-heatmap';
// import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import '../styles/layouts.css'

import HeatMap from 'react-heatmap-grid';

export default function CalendarMap ({habit}) {
    const [calendarData, setCalendarData] = useState([])
    const { hid, mid } = useParams()
    useEffect(() => {
        (async () => {
            let dataFetch = await fetch(`/api/habits/${hid}/calendar/${mid}`)
            const resObj = await dataFetch.json()
            console.log("CALENDER RESPONSE", resObj)
            console.log("HABIT", habit)
            setCalendarData(resObj)
        })()
    }, [])

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
    }
    const habitRGB = hexToRgb(habit.color.hex)


    if (!calendarData.startDate) return null;

    return (
        <>
            {/* <div className='calendarContainer'>
                <CalendarHeatmap
                startDate={new Date(calendarData.startDate)}
                endDate={new Date(calendarData.endDate)}
                values={calendarData.values}
                showWeekdayLabels={true}

                titleForValue={(value) => `${value}`}
                // classForValue={(value) => {
                //     if (!value) {
                //       return 'color-empty';
                //     }
                //     return `color-scale-stamped`;
                //   }}
                // />

                tooltipDataAttrs={value => {
                    if (value.date) {
                        return { 'data-tip': `${value.date}`}
                    }
                    return ""
                }}
                />
                <ReactTooltip />
            </div> */}
            <HeatMap
                xLabels={calendarData.xLabels}
                yLabels={calendarData.yLabels}
                data={calendarData.data}
                xLabelsLocation={"bottom"}
                xLabelWidth={60}
                squares
                height={30}
                cellStyle={(background, value, min, max, data, x, y) => ({
                    // background: `rgb(${habitRGB.r}, ${habitRGB.g}, ${habitRGB.b}, ${1-(max - value) / (max - min)}`,
                    background: `#000`,
                    fontSize: "11.5px",
                    color:`#000`
                })}
                cellRender={(value) => {
                    if (value === 100) {
                        return <i className={`fas fa-${habit.stamp.stamp}`} style={{color: habit.color.hex}} ></i>
                    }
                }}

            />

        </>
    )
}
