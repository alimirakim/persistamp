import React, { useContext } from 'react'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import FormWrapper from './FormWrapper'
import { DeleteButton } from './FormInputs'


export default function ProgramEditForm({ open, handleClose, program, handleOpenDelete }) {
  const { dispatchEditProgram } = useContext(ProgramBoardContext)

  const switchForms = (e) => {
    handleClose()
    handleOpenDelete()
  }
  
  const uniqueInputs = () => (<DeleteButton switchForms={switchForms} />)
  
  if (!open) return null
  
  return (
    <FormWrapper
      type="program"
      path={`/api/programs/edit/${program.id}`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchEditProgram}
      uniqueInputs={uniqueInputs}
      edit={program}
    />
  )
}
