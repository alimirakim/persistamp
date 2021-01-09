import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom'

import ProgramBoardContext from '../../context/ProgramBoardContext'
// import HabitContext from '../../context/HabitContext'
import HabitEditForm from '../forms/HabitEditForm'
import HabitDeleteForm from '../forms/HabitDeleteForm'
import StampBox from './StampBox'


// Though dailies is updating, habit's dailies list is not.
// Too many sources of truth.
export default function HabitRow({ habit, program }) {
  const { week, stamps } = useContext(ProgramBoardContext)

  return (
    <tr key={habit.id} style={{ color: habit.color }}>
      <td style={{ display: "flex", width: "max-content" }}>
        <HabitEditForm habit={habit} />
        <HabitDeleteForm habit={habit} />

        <Link
          to={`/graphs/${habit.id}/memberships/${program.membership_id}`}
          style={{ color: `${habit.color}`, textDecoration: "none" }}
        >
          <i className={`fas fa-${habit.icon}`}></i> {habit.title}
        </Link>
      </td>
      {week.map(day => {
        return <StampBox key={day}
          day={day}
          hid={habit.id}
          mid={program.membership_id}
        />
      })}
    </tr>)
}