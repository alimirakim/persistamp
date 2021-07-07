import FormWrapper from "./FormWrapper"
import React, { useState, useContext } from 'react'
import { ChooseLimit, ChooseQuantity, ChooseCost } from '../forms/FormInputs'
import RewardShopContext from '../../context/RewardShopContext'
import { DeleteButton } from '../forms/FormInputs'


export default function RewardEditForm({ open, handleClose, reward, handleOpenDelete }) {
  const { dispatchEditReward } = useContext(RewardShopContext)
  const [cost, setCost] = useState(reward.cost)
  const [limit, setLimit] = useState(reward.limit_per_member === -1 ? "" : reward.limit_per_member)
  const [quantity, setQuantity] = useState(reward.quantity === -1 ? "" : reward.quantity)

  const switchForms = () => {
    handleClose()
    handleOpenDelete()
  }

if (!open) return null

  return (
    <FormWrapper
      type="reward"
      path={`/api/rewards/${reward.id}/edit`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchEditReward}
      uniqueContent={{cost, limit, quantity}}
      edit={reward}
    >
      <div className="lo-row">
        <ChooseCost cost={cost} setCost={setCost} />
        <ChooseQuantity label="quantity" quantity={quantity} setQuantity={setQuantity} />
        <ChooseLimit limit={limit} setLimit={setLimit} />
        <DeleteButton switchForms={switchForms} />
      </div>
    </FormWrapper>
  )
}