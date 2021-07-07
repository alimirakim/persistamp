import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';

import OptionsContext from '../../context/OptionsContext'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import ProgramEditForm from '../forms/ProgramEditForm'
import ProgramDeleteForm from '../forms/ProgramDeleteForm'
import RewardPoints from "./RewardPoints";
import CurrentWeekRow from "./CurrentWeekRow";
import ProgramCardBody from './ProgramCardBody'
import ActivityForm from '../forms/ActivityForm'
import { AddButton, EditButton } from '../forms/FormInputs'
import Divider from './Divider'
import UserContext from "../../context/UserContext";

export default function ProgramCard({ program }) {
  const { colors, icons } = useContext(OptionsContext)
  const user = useContext(UserContext)

  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  let dark = program.cid == 3 ? "th-dark-mode" : ""

  const toggleCreate = (e) => setOpenCreate(!openCreate)
  const toggleEdit = (e) => setOpenEdit(!openEdit)
  const toggleDelete = (e) => setOpenDelete(!openDelete)

  return (<>

    <ProgramEditForm open={openEdit} handleClose={toggleEdit} program={program} handleOpenDelete={toggleDelete} />
    <ProgramDeleteForm open={openDelete} handleClose={toggleDelete} program={program} />
    <ActivityForm open={openCreate} handleClose={toggleCreate} pid={program.id} cid={program.cid} iid={program.iid} />

    <div className="th-card-shadow"></div>
    <article className="pbc" style={{ background: `linear-gradient(-45deg, rgb(20,10,0) -100%, ${colors[program.cid].hex}, rgb(255,255,255) 200%` }}>
      <i className={`pbc-bg-ico fas fa-10x fa-${icons[program.iid].title} ${dark}`}></i>

      <header className={`pbc-hdr ${dark}`}>

        {/* title, divider, description */}
        <div className="pbc-title-con">
          <h3 className="pbc-title">{program.title}</h3>
          <Divider icon={icons[program.iid].title} />
          {program.description && <blockquote className="pbc-desc th-quote">{program.description}</blockquote>}
        </div>

        {/* interactive buttons */}
        <div className="pbc-btns white">
          <AddButton handleOpen={toggleCreate} styles={dark} />
          <EditButton handleOpen={toggleEdit} styles={dark} />
        </div>

        {program.has_shop && <RewardPoints program={program} styles={dark} />}
        {!program.has_shop && <Link to="/reward-shop">
          <button className="ico-btn pbc-points" type="button">
            <i className={`lo-center fas fa-2x fa-${icons[user.iid].title} ${dark}`}/>
          </button>
        </Link>}

      </header>

      <div className={`pbc-body ${dark}`}>
        <table style={{ width: "100%" }}>
          <thead>
            <CurrentWeekRow program={program} />
          </thead>

          <ProgramCardBody program={program} />

        </table>
      </div>

    </article>
  </>)
}


{/* function ActivitiesOrMessage({ program, activities }) {

  } */}