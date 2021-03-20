import React, { useContext } from 'react'
import DeleteForm from '../forms/DeleteForm'
import RewardShopContext from '../../context/RewardShopContext'


export default function RewardDeleteForm({ open, handleClose, reward }) {
  const { dispatchDeleteReward } = useContext(RewardShopContext)

  if (!open) return null

  return (
    <DeleteForm
      itemType="reward"
      path={`/api/rewards/${reward.id}/delete`}
      open={open}
      handleClose={handleClose}
      item={reward}
      dispatcher={dispatchDeleteReward}
    />
  )
}
