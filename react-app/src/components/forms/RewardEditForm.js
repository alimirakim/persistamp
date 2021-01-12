import FormWrapper from "./FormWrapper"
import React, { useState, useContext } from 'react'
import { ChooseLimit, ChooseQuantity, ChooseCost } from '../forms/FormInputs'
import RewardShopContext from '../../context/RewardShopContext'


export default function RewardEditForm({ open, handleClose, reward }) {
  const { dispatchEditReward } = useContext(RewardShopContext)
  const [cost, setCost] = useState(reward.cost)
  const [limit, setLimit] = useState(reward.limit)
  const [quantity, setQuantity] = useState(reward.quantity)

  const uniqueInputs = () => (<>
    <ChooseCost cost={cost} setCost={setCost} />
    <ChooseLimit limit={limit} setLimit={setLimit} />
    <ChooseQuantity quantity={quantity} setQuantity={setQuantity} />
  </>)

  return (
    <FormWrapper
      type="reward"
      path={`/api/rewards/${reward.id}/edit`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchEditReward}
      uniqueContent={{cost, limit, quantity}}
      uniqueInputs={uniqueInputs}
      edit={reward}
    />
  )
}