import React, { useState, useContext } from 'react'
import FormWrapper from './FormWrapper'
import { DeleteButton, ChooseFrequency } from './FormInputs'
import ProgramBoardContext from '../../context/ProgramBoardContext'


export default function ActivityEditForm({ 
  open, 
  handleClose, 
  activity, 
  handleOpenDelete, 
}) {
  const {dispatchEditActivity} = useContext(ProgramBoardContext)
  const [frequency, setFrequency] = useState(activity.frequency)

  const updateFrequency = (e) => setFrequency(e.target.value)
  const switchForms = (e) => {
    handleClose()
    handleOpenDelete()
  }

  const uniqueInputs = () => (<>
    <ChooseFrequency frequency={frequency} updateFrequency={updateFrequency} />
    <DeleteButton switchForms={switchForms} />

  </>)

  if (!open) return null

  return (
    <FormWrapper
      type="activity"
      path={`/api/activities/edit/${activity.id}`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchEditActivity}
      uniqueContent={{ frequency }}
      uniqueInputs={uniqueInputs}
      edit={activity}
    />
  )
}