import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
// import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip } from 'recharts';
import OptionsContext from '../../context/OptionsContext'

function LineGraph({ color }) {
  const [dataPoints, setDataPoints] = useState([])
  const [toggleTime, setToggleTime] = useState("Weekly")
  const [xAxis, setXAxis] = useState("Week")
  const { hid, mid } = useParams()
  // const user = useContext(UserContext)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/habit-details/${hid}/memberships/${mid}/graph/${toggleTime}`)
      const resObj = await res.json()

      setDataPoints(resObj)
      setToggleTime("Monthly")
    })()
  }, [])

  const handleClick = async (e) => {
    if (toggleTime === "Monthly") {
      const updateRes = await fetch(`/api/habit-details/${hid}/memberships/${mid}/graph/${toggleTime}`)
      const newObj = await updateRes.json();
      setDataPoints(newObj)
      setToggleTime("Weekly")
      setXAxis("MONTH")
      return
    }
    const updateRes = await fetch(`/api/habit-details/${hid}/memberships/${mid}/graph/${toggleTime}`)
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
      <div className="lineGraphContainer hdp-graph">
        {/* <h3 className="lineGraphHeader hdp-subtitle">Line Graph</h3> */}
        {/* <button className="lineGraphToggle" onClick={handleClick}>{toggleTime}</button> */}
        {/* <label for="toggle-select">Choose an interval</label> */}
        <select className="hdp-graph-select" onChange={handleClick} name="toggleInterval" id="toggle-select">
          <option value="Weekly">WEEK</option>
          <option value="Monthly">MONTH</option>
        </select>
        <LineChart width={700} height={400} data={dataPoints.data} 
        margin={{ bottom: 15, left: 25 }}>
          <Line strokeWidth={5} type="monotone" 
          dataKey="stamps" dot={{ strokeWidth: 2 }} stroke={color} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

          <XAxis className="lineGraphLabels" dataKey="dates" stroke={color}>
            <Label
              stroke={color}
              value={xAxis.split("").join(" ")}
              offset={0}
              position="bottom"
            />
          </XAxis>
          <YAxis
            className="hdp-graph-label"
            label={{
              stroke: color,
              border: NamedNodeMap,
              value: 'S T A M P  C O U N T',
              angle: -90,
              position: "left"
            }}
            domain={dataPoints.yDomain}
            ticks={dataPoints.ticks}
            stroke={color}
            className="lineGraphLabels" />
          <Tooltip />
        </LineChart>
      </div>
    </>
  )
}

export default LineGraph
