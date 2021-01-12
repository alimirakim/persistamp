import React, { useContext } from 'react'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import FormWrapper from './FormWrapper'


export default function ProgramForm({ open, handleClose }) {
  const { dispatchCreateProgram } = useContext(ProgramBoardContext)

  if (!open) return null
  
  return (
    <FormWrapper
      type="program"
      path={`/api/programs/create`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchCreateProgram}
      defaultColor="#808080"
      defaultIcon="calendar-alt"
    />
  )
}
