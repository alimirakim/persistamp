import React, { useState, useContext } from 'react'
import FormWrapper from './FormWrapper'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import { ChooseFrequency } from './FormInputs'


export default function HabitEditForm({ open, handleClose, habit }) {
  const { dispatchEditHabit } = useContext(ProgramBoardContext)
  const [frequency, setFrequency] = useState(habit.frequency)
  const updateFrequency = (e) => setFrequency(e.target.value)

  const uniqueInputs = () => (
    <ChooseFrequency frequency={frequency} updateFrequency={updateFrequency} />
  )

  if (!open) return null
  
  return (
    <FormWrapper
      type="habit"
      path={`/api/habits/edit/${habit.id}`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchEditHabit}
      uniqueContent={{frequency}}
      uniqueInputs={uniqueInputs}
      edit={habit}
    />
  )
}