import React, {useContext} from 'react'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import DeleteForm from './DeleteForm'


export default function HabitDeleteForm({ open, handleClose, habit}) {
const {dispatchDeleteHabit} = useContext(ProgramBoardContext)
  if (!open) return null
  
  return (
    <DeleteForm
      path={`/api/habits/delete/${habit.id}`}
      open={open}
      handleClose={handleClose}
      itemType="program"
      item={habit}
      dispatcher={dispatchDeleteHabit}
    />
  )
}
