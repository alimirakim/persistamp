import React, { useState, useContext } from "react";
import { Link, Redirect } from 'react-router-dom'

import OptionsContext from '../../context/OptionsContext'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import HabitEditForm from '../forms/HabitEditForm'
import HabitDeleteForm from '../forms/HabitDeleteForm'
import StampBox from './StampBox'


export default function HabitRow({ habit, program }) {
  const { colors, icons } = useContext(OptionsContext)
  const { week } = useContext(ProgramBoardContext)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const { dispatchEditHabit, dispatchDeleteHabit } = useContext(ProgramBoardContext)

  const toggleEdit = (e) => setOpenEdit(!openEdit)
  const toggleDelete = (e) => setOpenDelete(!openDelete)

  return (<>

    <HabitEditForm
      open={openEdit}
      handleClose={toggleEdit}
      habit={habit}
      handleOpenDelete={toggleDelete}
      dispatcher={dispatchEditHabit}
    />
    <HabitDeleteForm
      open={openDelete}
      handleClose={toggleDelete}
      habit={habit}
      dispather={dispatchDeleteHabit}
    />

    <tr key={habit.id} className="habit-row">
      <td className="habit">
        <div className="habit-btns">

          {/* habit icon */}
          <button className="habit-ico" onClick={toggleEdit} style={{ color: colors[habit.cid].hex }}>
            <i className={`lo-center fas fa-${icons[habit.iid].title}`} data-fa-transform="shrink-6" data-fa-mask="fas fa-circle"></i>
          </button>

          <Link className="habit-btn-con" to={`/habits/${habit.id}/memberships/${program.mid}`} style={{ color: colors[habit.cid].hex }}>
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