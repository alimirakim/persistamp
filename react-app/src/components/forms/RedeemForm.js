
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

  const onRedeem = async () => {
    const res = await fetch(`/api/rewards/${reward.id}/memberships/${mid}/redeem`)
    const { redeemed_data } = await res.json()
    dispatchRedeemReward(redeemed_data)
    handleClose()
  }

  if (!open) return null

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
          <dd style={{ color: colors[reward.cid].hex }}>
            <i className={`fas fa-2x fa-${icons[reward.iid].hex}`}></i> {reward.cost}
          </dd>
        </dl>
        <ActionOrCancelButtons handleClose={handleClose} onAction={onRedeem} action={"Redeem"} />
      </DialogContent>
    </Dialog>
  )
}