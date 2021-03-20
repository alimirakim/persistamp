import React, { useState, useContext } from "react";
import { Link, Redirect } from 'react-router-dom'

import OptionsContext from '../../context/OptionsContext'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import ActivityEditForm from '../forms/ActivityEditForm'
import ActivityDeleteForm from '../forms/ActivityDeleteForm'
import StampBox from './StampBox'


export default function ActivityRow({ activity, program }) {
  const { colors, icons } = useContext(OptionsContext)
  const { week } = useContext(ProgramBoardContext)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const { dispatchEditActivity, dispatchDeleteActivity } = useContext(ProgramBoardContext)

  const toggleEdit = (e) => setOpenEdit(!openEdit)
  const toggleDelete = (e) => setOpenDelete(!openDelete)
  
  if (!activity) return null

  return (<>

    <ActivityEditForm
      open={openEdit}
      handleClose={toggleEdit}
      activity={activity}
      handleOpenDelete={toggleDelete}
      dispatcher={dispatchEditActivity}
    />
    <ActivityDeleteForm
      open={openDelete}
      handleClose={toggleDelete}
      activity={activity}
      dispather={dispatchDeleteActivity}
    />

      <td className="activity">
        <div className="activity-btns">

          {/* activity icon */}
          <button className="activity-ico" onClick={toggleEdit} style={{ color: colors[activity.cid].hex }}>
            <i className={`lo-center fas fa-${icons[activity.iid].title}`} data-fa-transform="shrink-6" data-fa-mask="fas fa-circle"></i>
          </button>

          <Link className="activity-btn-con" to={`/activities/${activity.id}/memberships/${program.mid}`} style={{ color: colors[activity.cid].hex }}>
            <div className="activity-btn">
              {/* activity title */}
              <span className="activity-title">
                <small className="activity-freq"> {activity.frequency}/wk - </small>
                <small className="activity-freq"> {activity.stamp_value}/pt</small>
                
                <div className="activity-title-txt">{activity.title}</div>
              </span>
            </div>
          </Link>
        </div>
      </td>
      {week.map(day => {
        return <StampBox key={day}
          day={day}
          aid={activity.id}
          mid={program.mid}
        />
      })}
  </>)
}