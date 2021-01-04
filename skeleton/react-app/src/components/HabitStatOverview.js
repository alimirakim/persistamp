import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import '../styles/layouts.css'
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from "@chakra-ui/stat";


const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
}
const customTheme= extendTheme({ config })



export default function HabitStatOverview ({ habit }) {
    const { mid, hid } = useParams()
    const [statData, setStatData] = useState([])
    useEffect(() => {
        (async () => {
            let res = await fetch(`/api/habits/${hid}/stats/${mid}`)
            let obj = await res.json()
            console.log("OBJ:", obj)
            setStatData(obj)
        })()
    }, [])
    if (!statData.monthPercentage) return null;

    return (
        <>
            <ChakraProvider theme={customTheme}>
                <div className="statContainer">
                    <h3 className="statOverview" style={{color:"#ccc", fontFamily:"Arial"}}>Statistics</h3>
                        <StatGroup className="statGroup">
                            <Stat>
                                <StatLabel>Score</StatLabel>
                                <StatNumber>{statData.score}</StatNumber>
                                <StatHelpText>{statData.scoreFraction}</StatHelpText>
                            </Stat>
                            <Stat>
                                <StatLabel>Month</StatLabel>
                                <StatNumber>{statData.monthPercentage}</StatNumber>
                                <StatHelpText>
                                <StatArrow type={statData.monthTrend} />
                                </StatHelpText>
                            </Stat>
                            <Stat>
                                <StatLabel>Total</StatLabel>
                                <StatNumber>{statData.total} stamps</StatNumber>
                            </Stat>
                            <Stat>
                                <StatLabel>Streak</StatLabel>
                                <StatNumber>{statData.currentStreak}</StatNumber>
                                <StatHelpText>
                                    Longest: {statData.longestStreak}
                                </StatHelpText>
                            </Stat>
                        </StatGroup>
                </div>
            </ChakraProvider>
        </>
    )
}
