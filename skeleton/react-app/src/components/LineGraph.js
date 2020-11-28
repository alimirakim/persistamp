import React, {useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom'
// import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import UserContext from '../context/UserContext';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip } from 'recharts';

function LineGraph() {
    const [dataPoints, setDataPoints] = useState([])
    const [toggleTime, setToggleTime] = useState("Weekly")
    const [xAxis, setXAxis] = useState("Week")
    const {habitId} = useParams()
    // const user = useContext(UserContext)

    useEffect(() => {
        (async () => {
            // console.log("TOGGLE TIME:   ", toggleTime)
            // console.log(typeof(toggleTime))
            const res = await fetch(`/api/habits/${habitId}/graph/${toggleTime}`)
            const resObj = await res.json()
            setDataPoints(resObj)
            setToggleTime("Monthly")
        })()
    }, [])

    const handleClick = async (e) => {
        if (toggleTime === "Monthly") {
            const updateRes = await fetch(`/api/habits/${habitId}/graph/${toggleTime}`)
            const newObj = await updateRes.json();
            setDataPoints(newObj)
            setToggleTime("Weekly")
            setXAxis("Month")
            return
        }
        const updateRes = await fetch(`/api/habits/${habitId}/graph/${toggleTime}`)
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
                <Line strokeWidth={3}type="monotone" dataKey="stamps" dot={{ strokeWidth: 2}}stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>

                <XAxis dataKey="dates" stroke="#2F4F4F">
                    <Label value={xAxis} offset={0} position="bottom" />
                </XAxis>
                <YAxis label={{ value:'Stamp Count', angle: -90, position:"left" }}
                        domain={dataPoints.yDomain}
                        ticks={dataPoints.ticks}
                        stroke="#2F4F4F"/>
                <Tooltip />
            </LineChart>
        </>
        // <VictoryChart theme={VictoryTheme.material}>
        //     <VictoryLine
        //         domain={{
        //             x:[0, dataPoints.data.length - 1], y:[0, 8]
        //         }}
        //         style={{
        //         data: { stroke: "#c43a31" },
        //         parent: { border: "1px solid #ccc"}
        //         }}
        //         data={dataPoints.data}
        //     />
        //     <VictoryAxis
        //         label="Week"
        //         style={ { axisLabel: { padding:30 }}}
        //     />
        //     <VictoryAxis dependentAxis
        //         label="Number of Stamps"
        //         style={ { axisLabel: { padding:30 }}}
        //     />
        // </VictoryChart>
    )
}

export default LineGraph
