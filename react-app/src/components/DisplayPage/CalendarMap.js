import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
// import CalendarHeatmap from 'react-calendar-heatmap';
// import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import HeatMap from 'react-heatmap-grid';
import OptionsContext from '../../context/OptionsContext';


export default function CalendarMap({ habit }) {
  const [calendarData, setCalendarData] = useState([])
  const {colors, icons} = useContext(OptionsContext)
  const { hid, mid } = useParams()
  const color = habit.cid === 32 ? "white" : colors[habit.cid].hex
  
  useEffect(() => {
    (async () => {
      let dataFetch = await fetch(`/api/habit-details/${hid}/calendar/${mid}`)
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
  // const habitRGB = hexToRgb(habit.cid)


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
            if (value === 99) {
              return {}
            }
            return {
              background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8))`,
              fontSize: "12px",
              // color:`#000`
            }
          }}
          xLabelsLocation="top"
          cellRender={(value) => {
            if (value === 100) {
              return <i className={`fas fa-${icons[habit.iid].title}`} style={{ color }} ></i>
            }
            // } else if (value === 99) {
            //     return <i className={`fas fa-${icons[habit.iid].title}`} style={{color: "#444"}} ></i>
            // }
          }}

        />

      </div>

    </>
  )
}
