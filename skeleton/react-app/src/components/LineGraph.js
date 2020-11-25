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
            const res = await fetch(`/api/habits/${habit_id}/data`)

            const resObj = await res.json()
            setDataPoints(resObj)
            console.log(resObj)
            console.log(dataPoints)

        })()
    }, [])

    return (
        <VictoryChart
  theme={VictoryTheme.material}
>
  <VictoryLine
    height={10}
    width={10}
    domain={{
        x:[0,10], y:[0, 10]
    }}
    style={{
      data: { stroke: "#c43a31" },
      parent: { border: "1px solid #ccc"}
    }}
    data={[
      { x: 1, y: 7 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 7 },
      { x: 0, y: 0 }
    ]}
  />
</VictoryChart>
    )
}

export default LineGraph
