import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom'

import ProgramBoardContext from '../../context/ProgramBoardContext'
// import HabitContext from '../../context/HabitContext'
import HabitEditForm from '../forms/HabitEditForm'
import HabitDeleteForm from '../forms/HabitDeleteForm'
import StampBox from './StampBox'
import { EditButton, DeleteButton } from '../forms/FormInputs'


// Though dailies is updating, habit's dailies list is not.
// Too many sources of truth.
export default function HabitRow({ habit, program }) {
  const { week } = useContext(ProgramBoardContext)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const toggleEdit = (e) => setOpenEdit(!openEdit)
  const toggleDelete = (e) => setOpenDelete(!openDelete)

  return (
    <tr key={habit.id} style={{ color: habit.color }}>
      <td style={{ display: "flex", width: "max-content" }}>

        <EditButton handleOpen={toggleEdit} />
        {openEdit &&
          <HabitEditForm open={openEdit} handleClose={toggleEdit} habit={habit} />
        }

        <DeleteButton handleOpen={toggleDelete} />
        {openDelete &&
          <HabitDeleteForm open={openDelete} handleClose={toggleDelete} habit={habit} />
        }

        <Link to={`/graphs/${habit.id}/memberships/${program.membership_id}`}>
          <div className="hbt-btn" style={{ backgroundColor: habit.color }}>
            <i className={`fas fa-${habit.icon}`}></i> {habit.title}
          </div>
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