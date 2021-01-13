import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import ProgramEditForm from '../forms/ProgramEditForm'
import ProgramDeleteForm from '../forms/ProgramDeleteForm'
import RewardPoints from "./RewardPoints";
import CurrentWeekRow from "./CurrentWeekRow";
import HabitRow from './HabitRow'
import HabitForm from '../forms/HabitForm'
import { AddButton, EditButton, DeleteButton } from '../forms/FormInputs'


export default function ProgramCard({ program }) {
  const { habits } = useContext(ProgramBoardContext)
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const rewardShopPath = `/programs/${program.id}/memberships/${program.membership_id}/rewards`

  const toggleCreate = (e) => setOpenCreate(!openCreate)
  const toggleEdit = (e) => setOpenEdit(!openEdit)
  const toggleDelete = (e) => setOpenDelete(!openDelete)

  return (
    <li key={program.id}>

      <ProgramEditForm open={openEdit} handleClose={toggleEdit} program={program} />
      <ProgramDeleteForm open={openDelete} handleClose={toggleDelete} program={program} />
      <HabitForm open={openCreate} handleClose={toggleCreate} pid={program.id} />
      <div className="th-card-shadow">
        <article className="pbc" style={{ background: `linear-gradient(-45deg, rgb(20,10,0) -100%, ${program.color}, rgb(255,255,255) 200%` }}>
          <i className={`pbc-bg-ico fas fa-10x fa-${program.icon}`}></i>

          <header className="pbc-hdr">
            <div className="pbc-title-con">
              <h3 className="pbc-title">{program.title}</h3>

              <div className="pbc-hr lo-row-center">
                <div className="line left" />
                <div className="pbc-ico">
                  <i className={`lo-center fas fa-xs fa-${program.icon}`} />
                </div>
                <div className="line right" />
              </div>

              {program.description && <>
                <blockquote className="pbc-desc">{program.description}</blockquote>
              </>}
            </div>

            <RewardPoints program={program} />

            {/* interactive buttons */}
            <div className="pbc-btns">
              <AddButton handleOpen={toggleCreate} />
              <EditButton handleOpen={toggleEdit} />
              <DeleteButton handleOpen={toggleDelete} />
            </div>

          </header>

          <div className="pbc-body">
            <table>
              <thead>
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
          </div>
        </article>
      </div>
    </li>
  )
}