import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import OptionsContext from '../../context/OptionsContext'
import RewardEditForm from '../forms/RewardEditForm'
import RewardDeleteForm from '../forms/RewardDeleteForm'
import RedeemForm from '../forms/RedeemForm'
import { EditButton } from '../forms/FormInputs'
import Divider from '../HomePage/Divider'

export default function RewardCard({ program, reward, redeemCount }) {
  const { mid } = useParams()
  const { colors, icons } = useContext(OptionsContext)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openRedeem, setOpenRedeem] = useState(false)
  let insufficientPoints = program.points < reward.cost
  let remainingLimit = reward.limit_per_member - redeemCount
  let disabled = insufficientPoints || remainingLimit === 0 || reward.quantity === 0
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
    <article>
      <RewardEditForm open={openEdit} handleClose={toggleEdit} reward={reward} handleOpenDelete={toggleDelete} />
      <RewardDeleteForm open={openDelete} handleClose={toggleDelete} reward={reward} />
      <RedeemForm open={openRedeem} handleClose={toggleRedeem} reward={reward} mid={mid} />

      <div className="rsc th-card-shadow" style={{ background: `linear-gradient(-45deg, rgb(20,10,0) -100%, ${colors[reward.cid].hex}, rgb(255,255,255) 200%` }}>
        <div className="th-inner-border">
        <div className="lo-top-left">
          <EditButton handleOpen={toggleEdit} />
        </div>
        <h3 className="lo-align-cen">{reward.title}</h3>
        <Divider icon={icons[reward.cid].title} />
        <blockquote className="pbc-desc">{reward.description ? `${reward.description}` : ""}</blockquote>
        <dl>
          <dt>Limit Per Member:</dt>
          <dd>{remainingRatio()}</dd>
          <dt>Quantity Remaining:</dt>
          <dd>{reward.quantity > -1 ? reward.quantity : "--"}</dd>
          {/* <dt>Cost:</dt> */}
          {/* <dd>{reward.cost} <i className={`fas fa-${icons[reward.iid].title}`}></i></dd> */}
        </dl>
        <button onClick={toggleRedeem} className="rsp-btn" disabled={disabled}>
          <span style={disabledStyle}>Redeem: <i className={`fas fa-lg fa-${icons[program.iid].title}`}>&nbsp;{reward.cost}</i></span>
        </button>
        </div>
      </div>

    </article>
  )
}