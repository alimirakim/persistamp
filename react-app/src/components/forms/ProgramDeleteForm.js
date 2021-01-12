import React, { useContext } from 'react'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import DeleteForm from './DeleteForm'


export default function ProgramDeleteForm({ open, handleClose, program }) {
  const { dispatchDeleteProgram } = useContext(ProgramBoardContext)

  if (!open) return null
  
  return (
    <DeleteForm
      itemType="program"
      path={`/api/programs/${program.id}`}
      open={open}
      handleClose={handleClose}
      item={program}
      dispatcher={dispatchDeleteProgram}
    />
  )
}