import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
// import CalendarHeatmap from 'react-calendar-heatmap';
// import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import HeatMap from 'react-heatmap-grid';
import OptionsContext from '../../context/OptionsContext';


export default function CalendarMap({ activity }) {
  const [calendarData, setCalendarData] = useState([])
  const { colors, icons } = useContext(OptionsContext)
  const { aid, mid } = useParams()
  const color = activity.cid === 3 ? "white" : colors[activity.cid].hex

  useEffect(() => {
    (async () => {
      let dataFetch = await fetch(`/api/activity-details/${aid}/calendar/${mid}`)
      const resObj = await dataFetch.json()
      setCalendarData(resObj)
    })()
  }, [])

  // const hexToRgb = (hex) => {
  //   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  //   return result ? {
  //     r: parseInt(result[1], 16),
  //     g: parseInt(result[2], 16),
  //     b: parseInt(result[3], 16)
  //   } : null;
  // }
  // const activityRGB = hexToRgb(activity.cid)


  if (!calendarData.yArr) return null;

  return (
    <>
      <div className="heatMapContainer">
        <h3 className="heatMapHeader hdp-cal">Calendar</h3>
        <HeatMap
          xLabels={calendarData.xLabels}
          yLabels={calendarData.yLabels}
          data={calendarData.yArr}
          xLabelsLocation={"bottom"}
          xLabelWidth={60}
          squares
          height={30}
          cellStyle={(background, value, min, max, data, x, y) => {
            if (value.val == 99) {
              return {
                // background: "black",
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8))`,
                fontSize: "12px",
              }
            } else {
              return {
                // background: "black",
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8))`,
                // background: `${color}`,
                fontSize: "12px",
                
                // textShadow: "0 0 0",
                // border: "1px dotted",
                // color:`#000`
              }
            }
          }}
          xLabelsLocation="top"
          cellRender={(value) => {
            const day = value.day
            if (value.val === 100) {
              return <i className={`fas fa-${icons[activity.iid].title}`} style={{ color }} ></i>
              // return <i className={`fas fa-${icons[activity.iid].title}`} style={{ color: "black" }} ></i>
            } else {
              return <i style={{ color: "#555" }} >{day}</i>
            }
          }}

        />

      </div>

    </>
  )
}
