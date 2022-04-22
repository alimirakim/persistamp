import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip } from 'recharts';


export default function LineGraph({ color }) {
  const [dataPoints, setDataPoints] = useState([])
  const [toggleTime, setToggleTime] = useState("Weekly")
  const [xAxis, setXAxis] = useState("Week")
  const { aid, mid } = useParams()

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

  return (
    <>
      <div className="toggleInterval">
        <label for="toggle-select">Choose an interval</label>

        <select onChange={handleClick} name="toggleInterval" id="toggle-select">
          <option value="Weekly">Week</option>
          <option value="Monthly">Month</option>
        </select>
      </div>
      <LineChart
        style={{ color: "black", textShadow: "none" }}
        padding={0}
        margin={0}
        width={600}
        height={400}
        data={dataPoints.data} >
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
