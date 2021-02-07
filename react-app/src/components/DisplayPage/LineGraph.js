import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
// import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip } from 'recharts';
import OptionsContext from '../../context/OptionsContext'

function LineGraph({ color }) {
  const [dataPoints, setDataPoints] = useState([])
  const [toggleTime, setToggleTime] = useState("Weekly")
  const [xAxis, setXAxis] = useState("Week")
  const { aid, mid } = useParams()
  // const user = useContext(UserContext)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/activity-details/${aid}/memberships/${mid}/graph/${toggleTime}`)
      const resObj = await res.json()

      setDataPoints(resObj)
      setToggleTime("Monthly")
    })()
  }, [])

  const handleClick = async (e) => {
    if (toggleTime === "Monthly") {
      const updateRes = await fetch(`/api/activity-details/${aid}/memberships/${mid}/graph/${toggleTime}`)
      const newObj = await updateRes.json();
      setDataPoints(newObj)
      setToggleTime("Weekly")
      setXAxis("MONTH")
      return
    }
    const updateRes = await fetch(`/api/activity-details/${aid}/memberships/${mid}/graph/${toggleTime}`)
    const newObj = await updateRes.json();
    setDataPoints(newObj)
    setToggleTime("Monthly")
    setXAxis("WEEK")
    return
  }

  if (!dataPoints.data) return null;
  // console.log("DATA", dataPoints)

  return (
    <>
        <div className="toggleInterval">
          <label for="toggle-select">Choose an interval</label>

          <select onChange={handleClick} name="toggleInterval" id="toggle-select">
              <option value="Weekly">Week</option>
              <option value="Monthly">Month</option>
          </select>
        </div>
        {/* <button className="lineGraphToggle" onClick={handleClick}>{toggleTime}</button> */}
        <LineChart style={{color: "black", textShadow: "none"}} padding={0} margin={0} width={600} height={400} data={dataPoints.data} >
          <Line 
          strokeWidth={2} 
          type="monotone"
          dataKey="stamps" 
          dot={{ strokeWidth: 2, fill: "black" }} 
          stroke={color}
          color="black" 
          />
          <CartesianGrid stroke="rgba(255,255,255,0.1)" />

          <XAxis
          className="lineGraphLabels"
          dataKey="dates"
          stroke={color}
          label={{
              stroke: color,
              border: NamedNodeMap,
              // value: 'WEEK',
              textShadow: "2px 2px 2px black",
              margin: "1rem",
            }}
          >
            <Label
              stroke={color}
              value={xAxis.split("").join(" ")}
              offset={0}
              position="bottom"
              textShadow="2px 2px 2px black"

            />
          </XAxis>
          <YAxis
            className="hdp-graph-label"
            label={{
              stroke: color,
              color: color,
              border: NamedNodeMap,
              value: 'S T A M P  C O U N T',
              angle: -90,
              margin: "1rem",
              // position: "left",
              textShadow: "2px 2px 2px black",
            }}
            domain={dataPoints.yDomain}
            ticks={dataPoints.ticks}
            stroke={color}
            className="lineGraphLabels" />
          <Tooltip />
        </LineChart>
    </>
  )
}

export default LineGraph
