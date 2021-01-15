import React, { useState, useContext } from "react";
import { Link, Redirect } from 'react-router-dom'

import OptionsContext from '../../context/OptionsContext'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import HabitEditForm from '../forms/HabitEditForm'
import HabitDeleteForm from '../forms/HabitDeleteForm'
import StampBox from './StampBox'
import { MiniEditButton } from '../forms/FormInputs'


export default function HabitRow({ habit, program }) {
  const { colors, icons } = useContext(OptionsContext)
  const { week } = useContext(ProgramBoardContext)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const toggleEdit = (e) => setOpenEdit(!openEdit)
  const toggleDelete = (e) => setOpenDelete(!openDelete)

  return (<>

    <HabitEditForm open={openEdit} handleClose={toggleEdit} habit={habit} handleOpenDelete={toggleDelete} />
    <HabitDeleteForm open={openDelete} handleClose={toggleDelete} habit={habit} />

    <tr key={habit.id} className="habit-row">
      <td className="habit">
        {/* <MiniDeleteButton handleOpen={toggleDelete} /> */}
        {/* <MiniEditButton handleOpen={toggleEdit} /> */}
        <div className="habit-btns">

          {/* habit icon */}
          <button className="habit-ico" onClick={toggleEdit} style={{ color: colors[program.cid].hex }}>
            <i className={`lo-center fas fa-${icons[habit.iid].title}`}></i>
          </button>

          <Link className="habit-btn-con" to={`/graphs/${habit.id}/memberships/${program.mid}`}>
            <div className="habit-btn">


              {/* habit title */}
              <span className="habit-title">
                <small className="habit-freq"> {habit.frequency} / wk</small>
                <div className="habit-title-txt">{habit.title}</div>
              </span>

            </div>
          </Link>
        </div>
      </td>
      {week.map(day => {
        return <StampBox key={day}
          day={day}
          hid={habit.id}
          mid={program.mid}
        />
      })}
    </tr>
  </>)
}