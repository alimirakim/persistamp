import React, { useState, useContext } from 'react'
import FormWrapper from './FormWrapper'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import {ChooseFrequency, ChooseQuantity} from './FormInputs'


export default function ActivityForm({ open, handleClose, pid, cid, iid }) {
  const { dispatchCreateActivity } = useContext(ProgramBoardContext)
  const [frequency, setFrequency] = useState(1)
  const [stampValue, setStampValue] = useState(1)
  const updateFrequency = (e) => setFrequency(e.target.value)
  const updateStampValue = (e) => setStampValue(e.target.value)

  const uniqueInputs = () => (<>
    <ChooseFrequency frequency={frequency} updateFrequency={updateFrequency} />
    <ChooseQuantity label="Stamp Value" quantity={stampValue} setQuantity={setStampValue} />
  </>)

  const resetUniqueInputs = (e) => {
    setFrequency(1)
    setStampValue(1)
  }
  
  if (!open) return null
  
  return (
    <FormWrapper
      type="activity"
      path={`/api/activities/programs/${pid}/create`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchCreateActivity}
      uniqueContent={{frequency, stampValue}}
      uniqueInputs={uniqueInputs}
      resetUniqueIniputs={resetUniqueInputs}
      defaultColorId={cid}
      defaultIconId={iid}
    />
  )
}