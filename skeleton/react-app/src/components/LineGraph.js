import React from 'react';
import { render } from 'react-dom';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';


function LineGraph() {
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
