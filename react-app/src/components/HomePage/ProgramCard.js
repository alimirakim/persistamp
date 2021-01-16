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
import Divider from './Divider'

export default function ProgramCard({ program }) {
  const { colors, icons } = useContext(OptionsContext)
  const { habits } = useContext(ProgramBoardContext)
  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  let dark = {}
  if (program.cid == 32) dark = { hdr: "white", body: "rgba(255,255,255,0.2)", icon: "black" }

  const toggleCreate = (e) => setOpenCreate(!openCreate)
  const toggleEdit = (e) => setOpenEdit(!openEdit)
  const toggleDelete = (e) => setOpenDelete(!openDelete)

  return (<>
    <li key={program.id} className="th-card-shadow" style={{}}>

      <ProgramEditForm open={openEdit} handleClose={toggleEdit} program={program} handleOpenDelete={toggleDelete} />
      <ProgramDeleteForm open={openDelete} handleClose={toggleDelete} program={program} />
      <HabitForm open={openCreate} handleClose={toggleCreate} pid={program.id} cid={program.cid} iid={program.iid} />

      <article className="pbc" style={{ background: `linear-gradient(-45deg, rgb(20,10,0) -100%, ${colors[program.cid].hex}, rgb(255,255,255) 200%` }}>
        <i className={`pbc-bg-ico fas fa-10x fa-${icons[program.iid].title}`} style={{ color: dark.icon }}></i>

        <header className="pbc-hdr" style={{ color: dark.hdr }}>

          {/* title, divider, description */}
          <div className="pbc-title-con">
            <h3 className="pbc-title">{program.title}</h3>
            <Divider icon={icons[program.iid].title} />
            {program.description && <blockquote className="pbc-desc">{program.description}</blockquote>}
          </div>

          {/* interactive buttons */}
          <div className="pbc-btns">
            <AddButton handleOpen={toggleCreate} />
            <EditButton handleOpen={toggleEdit} />
          </div>

          <RewardPoints program={program} />

        </header>

        <div className="pbc-body" style={{ backgroundColor: dark.body }}>
          <table style={{ width: "100%" }}>
            <thead>
              <CurrentWeekRow program={program} />
            </thead>

            <tbody>

              <HabitsOrMessage program={program} habits={habits} />
            </tbody>
          </table>
        </div>

      </article>
    </li>
  </>)
}


function HabitsOrMessage({ program, habits }) {

  if (program.hids.length) {
    return (
      [...program.hids].reverse().map(hid => (
        <HabitRow key={hid} habit={habits[hid]} program={program} />
      ))
    )
  } else {
    return (
      <p className="habit-none lo-center">This program has no habits yet.</p>
    )
  }
}