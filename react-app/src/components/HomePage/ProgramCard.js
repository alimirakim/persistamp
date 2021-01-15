import React, { useState, useContext } from "react";
import OptionsContext from '../../context/OptionsContext'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import ProgramEditForm from '../forms/ProgramEditForm'
import ProgramDeleteForm from '../forms/ProgramDeleteForm'
import RewardPoints from "./RewardPoints";
import CurrentWeekRow from "./CurrentWeekRow";
import HabitRow from './HabitRow'
import HabitForm from '../forms/HabitForm'
import { AddButton, EditButton } from '../forms/FormInputs'


export default function ProgramCard({ program }) {
  const {colors, icons} = useContext(OptionsContext)
  const { habits } = useContext(ProgramBoardContext)
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const toggleCreate = (e) => setOpenCreate(!openCreate)
  const toggleEdit = (e) => setOpenEdit(!openEdit)
  const toggleDelete = (e) => setOpenDelete(!openDelete)

  return (
    <li key={program.id}>

      <ProgramEditForm open={openEdit} handleClose={toggleEdit} program={program}  handleOpenDelete={toggleDelete} />
      <ProgramDeleteForm open={openDelete} handleClose={toggleDelete} program={program} />
      <HabitForm open={openCreate} handleClose={toggleCreate} pid={program.id} cid={program.cid} iid={program.iid} />
      <div className="th-card-shadow">
        <article className="pbc" style={{ background: `linear-gradient(-45deg, rgb(20,10,0) -100%, ${colors[program.cid].hex}, rgb(255,255,255) 200%` }}>
          <i className={`pbc-bg-ico fas fa-10x fa-${icons[program.iid].title}`}></i>

          <header className="pbc-hdr">
            <div className="pbc-title-con">
              <h3 className="pbc-title">{program.title}</h3>

              <div className="pbc-hr lo-row-center">
                <div className="line left" />
                <div className="pbc-ico">
                  <i className={`lo-center fas fa-xs fa-${icons[program.iid].title}`} />
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
              <EditButton handleOpen={toggleEdit}/>
            </div>

          </header>

          <div className="pbc-body">
            <table>
              <thead>
                <CurrentWeekRow program={program} />
              </thead>

              <tbody>
                {/* style={{display: "flex", flexDirection: "column-reverse"}}> */}
                {program.hids.map(hid => (
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
