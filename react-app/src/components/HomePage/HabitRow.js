import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom'

import HabitBoardContext from '../../context/HabitBoardContext'
import HabitContext from '../../context/HabitContext'
import HabitEditForm from '../forms/HabitEditForm'
import HabitDeleteForm from '../forms/HabitDeleteForm'
import StampBox from './StampBox'


// Though dailies is updating, habit's dailies list is not.
// Too many sources of truth.
export default function HabitRow({ habit, mid }) {
  const { week, dailies } = useContext(HabitBoardContext)
const [currentStamps, setCurrentStamps] = useState([])
  
  useEffect(() => {
    const updatedStamps = []
    let i = 0
    while (i < 7 && i < habit.daily_stamps.length) {
      const dsDate = dailies[habit.daily_stamps[i]].date
      const lastDate = week[6][1]
      if (dsDate >= lastDate) {
        updatedStamps.push(habit.daily_stamps[i])
      }
      i++
    }
    setCurrentStamps(updatedStamps)
  }, [dailies])
  
  useEffect(() => console.log("currentStamps", currentStamps), [currentStamps])

  if (!habit) return null

  return (
    <tr key={habit.id} style={{ color: habit.color }}>
      <td style={{ display: "flex", width: "max-content" }}>
        <HabitEditForm habit={habit} />
        <HabitDeleteForm habit={habit} />

        <Link
          to={`/graphs/${habit.id}/memberships/${mid}`}
          style={{ color: `${habit.color}`, textDecoration: "none" }}
        >
          <i className={`fas fa-${habit.icon}`}></i> {habit.habit}
        </Link>
      </td>
      {week.map(day => {
        return <StampBox key={day} currentStamps={currentStamps} day={day} mid={mid} habit={habit} />
      })}
    </tr>)
}