import React, { useContext } from 'react'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import FormWrapper from './FormWrapper'


export default function ProgramForm({ open, handleClose }) {
  const { dispatchCreateProgram } = useContext(ProgramBoardContext)

  const uniqueInputs = () => (<></>)

  return (
    <FormWrapper
      type="program"
      path={`/api/programs/create`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchCreateProgram}
      uniqueInputs={uniqueInputs}
    />
  )
}
