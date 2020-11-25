import React from 'react';
import { render } from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];

  const BarGraph = () => {
      return (
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryAxis tickValues={[1,2,3,4]}
                tickFormat={["carrot", "apple", "lion", "eric"]} />
            <VictoryAxis dependentAxis={true} tickFormat={(x) => (`$${x / 1000}k`)}/>
            <VictoryBar
            data={data}
            x="quarter"
            y="earnings"
            />
        </VictoryChart>
      )
  }

  export default BarGraph;
