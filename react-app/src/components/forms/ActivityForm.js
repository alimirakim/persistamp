import React, { useState, useContext } from 'react'
import FormWrapper from './FormWrapper'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import {ChooseFrequency} from './FormInputs'


export default function ActivityForm({ open, handleClose, pid, cid, iid }) {
  const { dispatchCreateActivity } = useContext(ProgramBoardContext)
  const [frequency, setFrequency] = useState(1)
  const updateFrequency = (e) => setFrequency(e.target.value)

  const uniqueInputs = () => (
    <ChooseFrequency frequency={frequency} updateFrequency={updateFrequency} />
  )

  const resetUniqueInputs = (e) => setFrequency(1)
  
  if (!open) return null
  
  return (
    <FormWrapper
      type="activity"
      path={`/api/activities/programs/${pid}/create`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchCreateActivity}
      uniqueContent={{frequency}}
      uniqueInputs={uniqueInputs}
      resetUniqueIniputs={resetUniqueInputs}
      defaultColorId={cid}
      defaultIconId={iid}
    />
  )
}