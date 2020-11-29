
import React, { useEffect, useState, useContext, useReducer } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';
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
  const { hid } = useParams()
  const {user} = useContext(UserContext)
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/habits/${hid}/graph`)

      const resObj = await res.json()
      setDataPoints(resObj)

    })()
  }, [])
  console.log(dataPoints)
  if (!dataPoints.data) return null;
  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={20} >
      <VictoryAxis
        tickValues={[1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14]}
        tickFormat={dataPoints.axisLabels}
        label="Week"
        style={ { axisLabel: { padding: 0 }}}

        fixLabelOverlap
        style={{tickLabels: { angle: 90 }}}
        />

      <VictoryAxis dependentAxis={true} tickLabelComponent={<VictoryLabel  />}/>
      <VictoryBar

        data={dataPoints.data}
        domain={ { x: [0,9], y: [0,8] } }
        x="weeks"
        y="stamps"
      />
    </VictoryChart>
  )
}

export default BarGraph;
