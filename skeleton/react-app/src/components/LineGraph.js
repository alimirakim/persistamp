import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
// import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import UserContext from '../context/UserContext';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip } from 'recharts';

function LineGraph({habit}) {
    const [dataPoints, setDataPoints] = useState([])
    const [toggleTime, setToggleTime] = useState("Weekly")
    const [xAxis, setXAxis] = useState("Week")
    const { hid, mid } = useParams()
    // const {user} = useContext(UserContext)

    useEffect(() => {
        (async () => {
            // console.log("TOGGLE TIME:   ", toggleTime)
            // console.log(typeof(toggleTime))
            const res = await fetch(`/api/habits/${hid}/members/${mid}/graph/${toggleTime}`)
            const resObj = await res.json()

            setDataPoints(resObj)
            setToggleTime("Monthly")
        })()
    }, [])

  const handleClick = async (e) => {
    if (toggleTime === "Monthly") {
      const updateRes = await fetch(`/api/habits/${hid}/members/${mid}/graph/${toggleTime}`)
      const newObj = await updateRes.json();
      setDataPoints(newObj)
      setToggleTime("Weekly")
      setXAxis("Month")
      return
    }
    const updateRes = await fetch(`/api/habits/${hid}/members/${mid}/graph/${toggleTime}`)
    const newObj = await updateRes.json();
    setDataPoints(newObj)
    setToggleTime("Monthly")
    setXAxis("Week")
    return
  }

  if (!dataPoints.data) return null;

    return (
        <>
            <div className="habitDetail">
                <ul>
                    <li>Habit: {dataPoints.habit.habit}</li>
                    <li>Description: {dataPoints.habit.description}</li>
                    <li>Created: {dataPoints.habit.created_at}</li>
                </ul>
            </div>
            <button onClick={handleClick}>{toggleTime}</button>
            <LineChart width={700} height={400} data={dataPoints.data} margin={{ bottom: 15, left:25}}>
                <Line strokeWidth={3}type="monotone" dataKey="stamps" dot={{ strokeWidth: 2}}stroke={habit.color.hex} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>

                <XAxis dataKey="dates" stroke={habit.color.hex}>
                    <Label stroke="#ccc" value={xAxis.split("").join(" ")} offset={0} position="bottom" />
                </XAxis>
                <YAxis label={{ stroke: "#ccc", value:'S t a m p   C o u n t', angle: -90, position:"left" }}
                        domain={dataPoints.yDomain}
                        ticks={dataPoints.ticks}
                        stroke={habit.color.hex}/>
                <Tooltip />
            </LineChart>
        </>
    )
}

export default LineGraph
