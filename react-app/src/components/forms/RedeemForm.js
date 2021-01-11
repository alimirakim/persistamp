
import React, { useEffect, useState, useContext, useReducer } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'

import { redeemReward } from '../../reducers/rewardsReducer'
import { ActionOrCancelButtons } from './FormInputs'


export default function RedeemForm({ redeemed, reward, uid, setPoints, dispatchRedeemed }) {
  const [open, setOpen] = useState(false)

  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)

  const onRedeem = async () => {
    setOpen(false)
    const res = await fetch(`/api/rewards/${reward.id}/memberships/${uid}/redeem`)
    const { redeemed_data, points } = await res.json()
    setPoints(points)
    dispatchRedeemed(redeemReward(redeemed_data))
    console.log("redeemed!", redeemed, redeemed_data)
  }

  return (<>
    <button onClick={handleOpen} style={{ color: reward.color, backgroundColor: "rgba(250,250,250,0.1)", borderRadius: "1rem", borderWidth: 0, width: "100%" }}>
      <h3>{reward.reward}</h3>
      <blockquote>{reward.description}</blockquote>
      <dl>
        <dt>Limit:</dt>
        <dd>{reward.limit_per_member}</dd>
        <dt>Quantity:</dt>
        <dd>{reward.quantity}</dd>
        <dt>Cost:</dt>
        <dd>{reward.cost} <i className={`fas fa-${reward.icon}`}></i></dd>
      </dl>
    </button>

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: reward.color }}>Redeem Reward: "{reward.reward}"</DialogTitle>
      <DialogContent style={{ color: reward.color }}>
        <blockquote>{reward.description}</blockquote>
        <dl>
          <dt>Limit per Member:</dt>
          <dd>{reward.limit_per_member}</dd>
          <dt>Quantity Remaining:</dt>
          <dd>{reward.quantity}</dd>
          <dt>Cost:</dt>
          <dd>{reward.cost} <i className={`fas fa-${reward.icon}`}></i></dd>
        </dl>
        <ActionOrCancelButtons handleClose={handleClose} onAction={onRedeem} action={"Redeem"} />
      </DialogContent>
    </Dialog>
</>)
}