import React, { useState, useContext } from "react";
import { Link, Redirect} from 'react-router-dom'

import ProgramBoardContext from '../../context/ProgramBoardContext'
import HabitEditForm from '../forms/HabitEditForm'
import HabitDeleteForm from '../forms/HabitDeleteForm'
import StampBox from './StampBox'
import { MiniEditButton, MiniDeleteButton } from '../forms/FormInputs'


export default function HabitRow({ habit, program }) {
  const { week } = useContext(ProgramBoardContext)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const toggleEdit = (e) => setOpenEdit(!openEdit)
  const toggleDelete = (e) => setOpenDelete(!openDelete)

  return (<>

    <HabitEditForm open={openEdit} handleClose={toggleEdit} habit={habit}  handleOpenDelete={toggleDelete} />
    <HabitDeleteForm open={openDelete} handleClose={toggleDelete} habit={habit} />

    <tr key={habit.id} className="habit-row">
      <td className="habit">
        {/* <MiniDeleteButton handleOpen={toggleDelete} /> */}
        <div className="habit-btns">
          <MiniEditButton handleOpen={toggleEdit} />
              &nbsp;
            <Link style={{width: "100%"}} to={`/graphs/${habit.id}/memberships/${program.membership_id}`}>
            <div className="habit-btn">
              <i className={`fas fa-${habit.icon}`} style={{ color: habit.color }}></i>
              <span className="habit-title">
                &nbsp;{habit.title}
              </span>
          </div>
            </Link>
        </div>
      </td>
      {week.map(day => {
        return <StampBox key={day}
          day={day}
          hid={habit.id}
          mid={program.membership_id}
        />
      })}
    </tr>
  </>)
}