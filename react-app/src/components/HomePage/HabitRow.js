import React, {useContext} from "react";
import { Link } from 'react-router-dom'

import HabitBoardContext from '../../context/HabitBoardContext'
import HabitEditForm from '../forms/HabitEditForm'
import HabitDeleteForm from '../forms/HabitDeleteForm'
import StampBox from './StampBox'


export default function HabitRow({ habit, mid }) {
  const { week, dailies } = useContext(HabitBoardContext)
  const currentWeekStamps = []
  // TODO Make this even smarter so it grabs exactly the stamps in the week
  let i = 0
  while (i < 7 && i < habit.daily_stamps.length) {
    currentWeekStamps.push(habit.daily_stamps[i])
    i++
  }
  console.log("current_week_stamps", currentWeekStamps)
  
  return (
    <tr key={habit.id} style={{ color: habit.color.hex }}>
      <td style={{ display: "flex", width: "max-content" }}>
        <HabitEditForm habit={habit} />
        <HabitDeleteForm habit={habit} />

        <Link 
        to={`/graphs/${habit.id}/memberships/${mid}`} 
        style={{ color: `${habit.color.hex}`, textDecoration: "none" }}
        >
          <i className={`fas fa-${habit.stamp.stamp}`}></i> {habit.habit}
        </Link>
      </td>
      {week.map(day => {
        const ds = currentWeekStamps.find(dsid=> dailies[dsid].date == day[1])
        const stampPath = `/api/daily-stamps/${habit.id}/programs/${habit.program}/memberships/${mid}/days/${day[1]}`
        return <StampBox ds={ds} mid={mid} habit={habit} stampPath={stampPath} />
      })}
    </tr>)
}