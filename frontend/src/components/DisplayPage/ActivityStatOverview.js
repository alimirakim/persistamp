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






export default function ActivityStatOverview({ activity }) {
  const { mid, aid } = useParams()
  const [statData, setStatData] = useState([])
  useEffect(() => {
    (async () => {
      let res = await fetch(`/api/activity-details/${aid}/stats/${mid}`)
      let obj = await res.json()
      setStatData(obj)
    })()
  }, [])
  if (!statData.monthPercentage) return null;

  return (
    <>
      {/* <ChakraProvider theme={customTheme}> */}
      <div className="statContainer hdp-stats">
        <h2 className="statOverview hdp-cal" style={{margin: "1rem 0 0", fontSize: "2.5rem", color: "white"}}>
        {/* "{activity.title}" */}
        Activity History
        </h2>
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
