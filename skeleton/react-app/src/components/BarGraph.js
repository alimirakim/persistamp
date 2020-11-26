
import React, { useEffect, useState, useContext, useReducer } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { useParams } from 'react-router-dom'
import UserContext from '../context/UserContext';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

const BarGraph = () => {
  const [dataPoints, setDataPoints] = useState([])
  const { habitId } = useParams()
  const user = useContext(UserContext)
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/habits/${habitId}/bargraph`)

      const resObj = await res.json()
      setDataPoints(resObj)

    })()
  }, [])
  console.log(dataPoints)
  if (!dataPoints.data) return null;
  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
      <VictoryAxis tickValues={[1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14]}
        tickFormat={dataPoints.axisLabels} />
      {/* tickFormat={["carrot", "apple", "lion", "eric"]} /> */}
      <VictoryAxis dependentAxis={true} tickFormat={(x) => x} />
      <VictoryBar
        data={dataPoints.data}
        x="dates"
        y="stamps"
      />
    </VictoryChart>
  )
}

export default BarGraph;
