import React, { useState, useContext } from 'react'
import FormWrapper from './FormWrapper'
import { DeleteButton, ChooseFrequency, ChooseQuantity } from './FormInputs'
import ProgramBoardContext from '../../context/ProgramBoardContext'


export default function ActivityEditForm({ 
  open, 
  handleClose, 
  activity, 
  handleOpenDelete, 
}) {
  const {dispatchEditActivity} = useContext(ProgramBoardContext)
  const [frequency, setFrequency] = useState(activity.frequency)
  const [stampValue, setStampValue] = useState(activity.stamp_value)
  const updateFrequency = (e) => setFrequency(e.target.value)
  
  const switchForms = (e) => {
    handleClose()
    handleOpenDelete()
  }

  if (!open) return null

  return (
    <FormWrapper
      type="activity"
      path={`/api/activities/edit/${activity.id}`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchEditActivity}
      uniqueContent={{ frequency, stampValue }}
      edit={activity}
    >    
      <ChooseFrequency frequency={frequency} updateFrequency={updateFrequency} />
      <ChooseQuantity label="Stamp Value" quantity={stampValue} setQuantity={setStampValue} />
      <DeleteButton switchForms={switchForms} />
    </FormWrapper>
  )
}