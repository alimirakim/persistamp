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
            // console.log("CALENDER RESPONSE", resObj)
            // console.log("HABIT", habit)
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


    if (!calendarData.yArr) return null;

    return (
        <>
            <div className="heatMapContainer">
                <h3 className="heatMapHeader" style={{color:"#ccc", fontFamily:"Arial"}}>Calendar</h3>
                <HeatMap
                    xLabels={calendarData.xLabels}
                    yLabels={calendarData.yLabels}
                    data={calendarData.yArr}
                    xLabelsLocation={"bottom"}
                    xLabelWidth={60}
                    squares
                    height={30}
                    cellStyle={(background, value, min, max, data, x, y) => {
                        if (value === 99) {
                            return {}
                        }
                        return {
                            background: `#000`,
                            fontSize: "11.5px",
                            // color:`#000`
                        }
                    }}
                    xLabelsLocation="top"
                    cellRender={(value) => {
                        if (value === 100) {
                            return <i className={`fas fa-${habit.stamp.stamp}`} style={{color: habit.color.hex}} ></i>
                        }
                        // } else if (value === 99) {
                        //     return <i className={`fas fa-${habit.stamp.stamp}`} style={{color: "#444"}} ></i>
                        // }
                    }}

                />

            </div>

        </>
    )
}
