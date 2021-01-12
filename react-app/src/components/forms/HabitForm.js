import React, { useState, useContext } from 'react'
import FormWrapper from './FormWrapper'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import {ChooseFrequency} from './FormInputs'


export default function HabitForm({ open, handleClose, pid }) {
  const { programs, dispatchCreateHabit } = useContext(ProgramBoardContext)
  const [frequency, setFrequency] = useState(7)
  const updateFrequency = (e) => setFrequency(e.target.value)

  const uniqueInputs = () => (
    <ChooseFrequency frequency={frequency} updateFrequency={updateFrequency} />
  )

  const resetUniqueInputs = (e) => setFrequency(7)
  
  if (!open) return null
  
  return (
    <FormWrapper
      type="habit"
      path={`/api/habits/programs/${pid}/create`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchCreateHabit}
      uniqueContent={{frequency}}
      uniqueInputs={uniqueInputs}
      resetUniqueIniputs={resetUniqueInputs}
      defaultColor={programs[pid].color}
      defaultIcon="check-circle"
    />
  )
}
