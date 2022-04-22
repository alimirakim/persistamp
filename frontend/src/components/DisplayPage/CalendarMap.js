import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
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
          cellStyle={(value) => {
            if (value.val == 99) {
              return {
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8))`,
                fontSize: "12px",
              }
            } else {
              return {
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8))`,
                fontSize: "12px",
              }
            }
          }}
          xLabelsLocation="top"
          cellRender={(value) => {
            const day = value.day
            if (value.val === 100) {
              return <i className={`fas fa-${icons[activity.iid].title}`} style={{ color }} ></i>
            } else {
              return <i style={{ color: "#555" }} >{day}</i>
            }
          }}

        />

      </div>

    </>
  )
}
