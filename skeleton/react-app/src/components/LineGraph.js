import React, {useEffect, useState, useContext, useReducer }from 'react';
import { render } from 'react-dom';
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

    const user = useContext(UserContext)
    const habit_id = 4
    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/habits/${habit_id}/linegraph`)

            const resObj = await res.json()
            setDataPoints(resObj)

        })()
    }, [])
    if (!dataPoints.data) return null;

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
