import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import RewardEditForm from '../forms/RewardEditForm'
import RewardDeleteForm from '../forms/RewardDeleteForm'
import RedeemForm from '../forms/RedeemForm'
import { Icon, EditButton, DeleteButton } from '../forms/FormInputs'


export default function RewardCard({ program, reward }) {
  const { mid } = useParams()
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openRedeem, setOpenRedeem] = useState(false)
  let insufficientPoints = program.points < reward.cost
  const insufficientPointsStyle = insufficientPoints ? { color: "red" } : {}

  const toggleEdit = (e) => setOpenEdit(!openEdit)
  const toggleDelete = (e) => setOpenDelete(!openDelete)
  const toggleRedeem = (e) => setOpenRedeem(!openRedeem)

  return (
    <article className="rsc th-shadow" style={{ backgroundColor: reward.color }}>
    
        <RewardEditForm open={openEdit} handleClose={toggleEdit} reward={reward} />
        <RewardDeleteForm open={openDelete} handleClose={toggleDelete} reward={reward} />

      <div style={{ display: "flex", borderBottom: "1px rgba(0,0,0,0.2) solid" }}>
        <EditButton handleOpen={toggleEdit} />
        <DeleteButton handleOpen={toggleDelete} />
        <h3>{reward.title}</h3>
      </div>
      <blockquote>{reward.description ? `"${reward.description}"` : ""}</blockquote>
      <dl>
        <dt>Limit:</dt>
        <dd>{reward.limit_per_member > -1 ? reward.limit_per_member : "--"}</dd>
        <dt>Quantity:</dt>
        <dd>{reward.quantity > -1 ? reward.quantity : "--"}</dd>
        {/* <dt>Cost:</dt> */}
        {/* <dd>{reward.cost} <i className={`fas fa-${reward.icon}`}></i></dd> */}
      </dl>
      <button onClick={toggleRedeem} className="rsp-btn" disabled={insufficientPoints}>
        <span style={insufficientPointsStyle}>Redeem (Cost: <Icon icon={reward.icon} /> {reward.cost})</span>
      </button>
        <RedeemForm open={openRedeem} handleClose={toggleRedeem} reward={reward} mid={mid} />
    </article>
  )
}