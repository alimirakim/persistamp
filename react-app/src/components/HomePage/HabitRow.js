import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom'

import HabitBoardContext from '../../context/HabitBoardContext'
// import HabitContext from '../../context/HabitContext'
import HabitEditForm from '../forms/HabitEditForm'
import HabitDeleteForm from '../forms/HabitDeleteForm'
import StampBox from './StampBox'


// Though dailies is updating, habit's dailies list is not.
// Too many sources of truth.
export default function HabitRow({ habit, membership }) {
  const { week, stamps } = useContext(HabitBoardContext)
const [currentStamps, setCurrentStamps] = useState([])
  
  useEffect(() => {
    const updatedStamps = []
    const hid_sids = membership.hid_sids[habit.id]
    let i = 0
    while (i < 7 && i < hid_sids.length) {
      const dsDate = stamps[hid_sids[i]].date
      const lastDate = week[6][1]
      console.log("dsDate", dsDate, "lastDate", lastDate)
      if (new Date(dsDate) >= new Date(lastDate)) {
        console.log("dsDate greater than lastDate")
        updatedStamps.push(hid_sids[i])
      }
      i++
    }
    setCurrentStamps(updatedStamps)
  }, [stamps])
  
  useEffect(() => console.log("currentStamps", currentStamps), [currentStamps])

  return (
    <tr key={habit.id} style={{ color: habit.color }}>
      <td style={{ display: "flex", width: "max-content" }}>
        <HabitEditForm habit={habit} />
        <HabitDeleteForm habit={habit} />

        <Link
          to={`/graphs/${habit.id}/memberships/${membership.id}`}
          style={{ color: `${habit.color}`, textDecoration: "none" }}
        >
          <i className={`fas fa-${habit.icon}`}></i> {habit.title}
        </Link>
      </td>
      {week.map(day => {
        return <StampBox key={day} currentStamps={currentStamps} day={day} mid={membership.id} habit={habit} />
      })}
    </tr>)
}