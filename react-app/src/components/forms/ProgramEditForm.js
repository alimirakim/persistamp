import React, { useContext } from 'react'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import { editProgram } from '../../context/reducers'
import FormWrapper from './FormWrapper'


export default function ProgramEditForm({ open, handleClose, program }) {
  const { dispatchPrograms } = useContext(ProgramBoardContext)

  const uniqueInputs = () => (<></>)

  return (
    <FormWrapper
      type="program"
      path={`/api/programs/edit/${program.id}`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchPrograms}
      actionCreator={editProgram}
      // uniqueContent={}
      uniqueInputs={uniqueInputs}
      edit={program}
    />
  )
}
