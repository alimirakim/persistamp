import FormWrapper from "./FormWrapper"
import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ChooseLimit, ChooseQuantity, ChooseCost } from '../forms/FormInputs'
import RewardShopContext from '../../context/RewardShopContext'


export default function RewardForm({ open, handleClose, cid, iid }) {
  const { dispatchCreateReward } = useContext(RewardShopContext)
  const { pid } = useParams()
  const [cost, setCost] = useState(5)
  const [limit, setLimit] = useState("")
  const [quantity, setQuantity] = useState("")

  const uniqueInputs = () => (<div className="lo-row">
    <ChooseCost cost={cost} setCost={setCost} />
    <ChooseLimit limit={limit} setLimit={setLimit} />
    <ChooseQuantity quantity={quantity} setQuantity={setQuantity} />
  </div>)
  
  const resetUniqueInputs = (e) => {
    setCost(5)
    setLimit("")
    setQuantity("")
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
      defaultColorId={cid}
      defaultIconId={iid}
    />
  )
}