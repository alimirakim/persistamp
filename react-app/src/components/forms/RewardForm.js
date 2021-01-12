import FormWrapper from "./FormWrapper"
import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ChooseLimit, ChooseQuantity, ChooseCost } from '../forms/FormInputs'
import RewardShopContext from '../../context/RewardShopContext'


export default function RewardForm({ open, handleClose }) {
  const { program, dispatchCreateReward } = useContext(RewardShopContext)
  const { pid } = useParams()
  const [cost, setCost] = useState(7)
  const [limit, setLimit] = useState(-1)
  const [quantity, setQuantity] = useState(-1)

  const uniqueInputs = () => (<>
    <ChooseCost cost={cost} setCost={setCost} />
    <ChooseLimit limit={limit} setLimit={setLimit} />
    <ChooseQuantity quantity={quantity} setQuantity={setQuantity} />
  </>)
  
  const resetUniqueInputs = (e) => {
    setCost(7)
    setLimit(-1)
    setQuantity(-1)
  }

  if (!open) return null
  
  return (
    <FormWrapper
      type="reward"
      path={`/api/rewards/programs/${pid}/create`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchCreateReward}
      uniqueContent={{ cost, limit, quantity }}
      uniqueInputs={uniqueInputs}
      resetUniqueInputs={resetUniqueInputs}
      defaultColor={program.color}
      defaultIcon="award"
    />
  )
}