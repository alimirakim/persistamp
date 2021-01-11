import React, { useContext } from 'react'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import { deleteProgram } from '../../context/reducers'
import DeleteForm from './DeleteForm'


export default function ProgramDeleteForm({ open, handleClose, program }) {
  const { dispatchHabits } = useContext(ProgramBoardContext)

  return (
    <DeleteForm
      itemType="program"
      path={`/api/programs/${program.id}`}
      open={open}
      handleClose={handleClose}
      item={program}
      dispatcher={dispatchHabits}
      actionCreator={deleteProgram}
    />
  )
}