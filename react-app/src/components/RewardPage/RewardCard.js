import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import RewardEditForm from '../forms/RewardEditForm'
import RewardDeleteForm from '../forms/RewardDeleteForm'
import RedeemForm from '../forms/RedeemForm'
import { Icon, EditButton, DeleteButton } from '../forms/FormInputs'


export default function RewardCard({ program, reward, redeemCount }) {
  const { mid } = useParams()
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openRedeem, setOpenRedeem] = useState(false)
  let insufficientPoints = program.points < reward.cost
  let remainingLimit = reward.limit_per_member - redeemCount
  let disabled= insufficientPoints || remainingLimit === 0 || reward.quantity === 0
  const disabledStyle = disabled ? { color: "red" } : {}

  const toggleEdit = (e) => setOpenEdit(!openEdit)
  const toggleDelete = (e) => setOpenDelete(!openDelete)
  const toggleRedeem = (e) => setOpenRedeem(!openRedeem)

  const remainingRatio = () => {
    if (reward.limit_per_member > -1) {
      return `${remainingLimit} / ${reward.limit_per_member}`
    }
    return "--"
  }


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
        <dt>Limit Per Member:</dt>
        <dd>{remainingRatio()}</dd>
        <dt>Quantity Remaining:</dt>
        <dd>{reward.quantity > -1 ? reward.quantity : "--"}</dd>
        {/* <dt>Cost:</dt> */}
        {/* <dd>{reward.cost} <i className={`fas fa-${reward.icon}`}></i></dd> */}
      </dl>
      <button onClick={toggleRedeem} className="rsp-btn" disabled={disabled}>
        <span style={disabledStyle}>Redeem: <i className={`fas fa-lg fa-${reward.icon}`}></i> {reward.cost}</span>
      </button>
      <RedeemForm open={openRedeem} handleClose={toggleRedeem} reward={reward} mid={mid} />
    </article>
  )
}