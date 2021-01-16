import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/stat";






export default function HabitStatOverview({ habit }) {
  const { mid, hid } = useParams()
  const [statData, setStatData] = useState([])
  useEffect(() => {
    (async () => {
      let res = await fetch(`/api/habit-details/${hid}/stats/${mid}`)
      let obj = await res.json()
      setStatData(obj)
    })()
  }, [])
  if (!statData.monthPercentage) return null;

  return (
    <>
      {/* <ChakraProvider theme={customTheme}> */}
      <div className="statContainer hdp-stats">
        {/* <h3 className="statOverview hdp-subtitle">
        Statistics
        </h3> */}
        <StatGroup className="statGroup ">
          <Stat>
            <StatLabel className="hdp-stats-label">Score</StatLabel>
            <StatNumber>{statData.score}</StatNumber>
            <StatHelpText>{statData.scoreFraction}</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel className="hdp-stats-label">Month</StatLabel>
            <StatNumber>{statData.monthPercentage}</StatNumber>
            <StatHelpText>
              <StatArrow type={statData.monthTrend} />
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel className="hdp-stats-label">Total</StatLabel>
            <StatNumber>{statData.total} stamps</StatNumber>
          </Stat>
          <Stat>
            <StatLabel className="hdp-stats-label">Streak</StatLabel>
            <StatNumber>{statData.currentStreak}</StatNumber>
            <StatHelpText>
              Longest: {statData.longestStreak}
            </StatHelpText>
          </Stat>
        </StatGroup>
      </div>
      {/* </ChakraProvider> */}
    </>
  )
}
