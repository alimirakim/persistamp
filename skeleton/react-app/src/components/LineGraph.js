import React, {useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom'
// import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import UserContext from '../context/UserContext';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

function LineGraph() {
    const [dataPoints, setDataPoints] = useState([])
    const {habitId} = useParams()
    // const user = useContext(UserContext)

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/habits/${habitId}/graph`)
            const resObj = await res.json()

            setDataPoints(resObj)
        })()
    }, [])

    if (!dataPoints.data) return null;

    return (
        <LineChart width={700} height={400} data={dataPoints.data}>
            <Line type="monotone" dataKey="stamps" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
            <XAxis dataKey="dates" />
            <YAxis />
        </LineChart>
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
