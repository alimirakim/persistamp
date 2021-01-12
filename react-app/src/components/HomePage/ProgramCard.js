import React, { useState, useContext } from "react";

import ProgramBoardContext from '../../context/ProgramBoardContext'
import ProgramEditForm from '../forms/ProgramEditForm'
import ProgramDeleteForm from '../forms/ProgramDeleteForm'
import RewardShopButton from "./RewardShopButton";
import CurrentWeekRow from "./CurrentWeekRow";
import HabitRow from './HabitRow'
import HabitForm from '../forms/HabitForm'
import { EditButton, DeleteButton } from '../forms/FormInputs'


export default function ProgramCard({ program }) {
  const { habits } = useContext(ProgramBoardContext)
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const toggleCreate = (e) => setOpenCreate(!openCreate)
  const toggleEdit = (e) => setOpenEdit(!openEdit)
  const toggleDelete = (e) => setOpenDelete(!openDelete)

  return (
    <li key={program.id}>
      <table className="board th-dark-gr" style={{ color: program.color }}>

        <thead>
          <tr key={program.id} style={{ color: program.color }}>
            <td colSpan={8}>
              <div className="program">
                <div style={{ display: "flex" }}>

                  <EditButton handleOpen={toggleEdit} />
                    <ProgramEditForm open={openEdit} handleClose={toggleEdit} program={program} />

                  <DeleteButton handleOpen={toggleDelete} />
                    <ProgramDeleteForm open={openDelete} handleClose={toggleDelete} program={program} />

                  <h3 className="program-title">
                    <i className={`fas fa-${program.icon}`}></i> {program.title}
                  </h3>
                  <button onClick={toggleCreate}>Add Habit</button>
                    <HabitForm open={openCreate} handleClose={toggleCreate} pid={program.id} />
                </div>
                <RewardShopButton program={program} />
              </div>
              <blockquote>{program.description}</blockquote>

            </td>
          </tr>
          {/* TODO Where is dispatchHabits?  */}
          <CurrentWeekRow program={program} />
        </thead>

        <tbody>
          {/* style={{display: "flex", flexDirection: "column-reverse"}}> */}
          {program.habit_ids.map(hid => (
            <HabitRow key={hid} habit={habits[hid]} program={program} />
          ))
          }
        </tbody>
      </table>
    </li>
  )
}