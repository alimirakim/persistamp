import React, { useContext } from 'react'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import FormWrapper from './FormWrapper'


export default function ProgramEditForm({ open, handleClose, program }) {
  const { dispatchEditProgram } = useContext(ProgramBoardContext)

  if (!open) return null
  
  return (
    <FormWrapper
      type="program"
      path={`/api/programs/edit/${program.id}`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchEditProgram}
      edit={program}
    />
  )
}
