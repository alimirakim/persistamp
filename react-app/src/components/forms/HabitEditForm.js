import React, { useState, useContext } from 'react'
import FormWrapper from './FormWrapper'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import { DeleteButton, ChooseFrequency } from './FormInputs'


export default function HabitEditForm({ open, handleClose, habit, handleOpenDelete }) {
  const { dispatchEditHabit } = useContext(ProgramBoardContext)
  const [frequency, setFrequency] = useState(habit.frequency)
  
  const updateFrequency = (e) => setFrequency(e.target.value)
  const switchForms = (e) => {
    handleClose()
    handleOpenDelete()
  }

  const uniqueInputs = () => (<>
    <ChooseFrequency frequency={frequency} updateFrequency={updateFrequency} />
    <div><button onClick={switchForms} className="del-btn">
    <i className="fas fa-eraser"/> Delete
    </button></div>
    
  </>)

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