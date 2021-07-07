
import React, { useContext, } from 'react'
import {useParams} from 'react-router-dom'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'

import RewardShopContext from '../../context/RewardShopContext'
import { ActionOrCancelButtons } from './FormInputs'
import OptionsContext from '../../context/OptionsContext'


export default function RedeemForm({ open, handleClose, reward }) {
  const {mid} = useParams()
  const { colors, icons } = useContext(OptionsContext)
  const { dispatchRedeemReward } = useContext(RewardShopContext)
  const path = mid ? `/api/rewards/${reward.id}/memberships/${mid}/redeem` : `/api/rewards/${reward.id}/redeem`

  const onRedeem = async () => {
    const res = await fetch(path)
    const { receipt_data } = await res.json()
    console.log("receipt", receipt_data)
    dispatchRedeemReward(receipt_data)
    handleClose()
  }

  if (!open) return null

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Redeem Reward "{reward.title}"</DialogTitle>
      <DialogContent>
        <blockquote>{reward.description}</blockquote>
        <dl className="th-dl-oneline">
          {/* <dt>Limit per Member:</dt> */}
          {/* <dd>{reward.limit_per_member > -1 ? reward.limit_per_member : "--"}</dd> */}
          <dt>Cost:</dt>
          <dd>{reward.cost} {reward.cost === 1 ? "Point" : "Points"}</dd>
          <br/>
          <dt>Quantity Remaining:</dt>
          <dd>{reward.quantity > -1 ? reward.quantity : "--"}</dd>
        </dl>
        <ActionOrCancelButtons handleClose={handleClose} onAction={onRedeem} action={"Redeem"} />
      </DialogContent>
    </Dialog>
  )
}