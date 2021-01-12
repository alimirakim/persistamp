
import React, { useEffect, useState, useContext, useReducer } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'

import RewardShopContext from '../../context/RewardShopContext'
import { ActionOrCancelButtons } from './FormInputs'


export default function RedeemForm({ open, handleClose, reward, mid }) {
  const { dispatchRedeemReward } = useContext(RewardShopContext)

  const onRedeem = async () => {
    const res = await fetch(`/api/rewards/${reward.id}/memberships/${mid}/redeem`)
    const { redeemed_data } = await res.json()
    dispatchRedeemReward(redeemed_data)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Redeem Reward: "{reward.title}"</DialogTitle>
      <DialogContent>
        <blockquote>{reward.description}</blockquote>
        <dl>
          <dt>Limit per Member:</dt>
          <dd>{reward.limit_per_member > -1 ? reward.limit_per_member : "--"}</dd>
          <dt>Quantity Remaining:</dt>
          <dd>{reward.quantity > -1 ? reward.quantity : "--"}</dd>
          <dt>Cost:</dt>
          <dd style={{color: reward.color}}><i className={`fas fa-2x fa-${reward.icon}`}></i> {reward.cost}</dd>
        </dl>
        <ActionOrCancelButtons handleClose={handleClose} onAction={onRedeem} action={"Redeem"} />
      </DialogContent>
    </Dialog>
  )
}