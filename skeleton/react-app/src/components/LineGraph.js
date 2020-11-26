import React, {useEffect, useState, useContext} from 'react';
import { useParams } from 'react-router-dom'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import UserContext from '../context/UserContext';

// function reducer(state, action) {
//     switch (action.type) {
//         case 'set':
//             return {  }
//         case 'weeklyData':
//             const newData = state.habitDays
//             return newData;
//     }
// }


function LineGraph() {
    const [dataPoints, setDataPoints] = useState([])
    const {habitId} = useParams()
    // const user = useContext(UserContext)
    
    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/habits/${habitId}/linegraph`)
            const resObj = await res.json()
            console.log("hello?", resObj)
            setDataPoints(resObj)
        })()
    }, [])

    console.log("reaching after effect")
    if (!dataPoints.data) return null;
    console.log("reaching after null check")

    return (
        <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
                domain={{
                    x:[0, dataPoints.data.length - 1], y:[0, 8]
                }}
                style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
                }}
                data={dataPoints.data}
            />
            <VictoryAxis
                label="Week"
                style={ { axisLabel: { padding:30 }}}
            />
            <VictoryAxis dependentAxis
                label="Number of Stamps"
                style={ { axisLabel: { padding:30 }}}
            />
        </VictoryChart>
    )
}

export default LineGraph
