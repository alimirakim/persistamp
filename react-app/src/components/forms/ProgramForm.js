import React, { useContext } from 'react'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import UserContext from '../../context/UserContext'
import FormWrapper from './FormWrapper'


export default function ProgramForm({ open, handleClose }) {
  const { dispatchCreateProgram } = useContext(ProgramBoardContext)
  const user = useContext(UserContext)

  if (!open) return null
  
  return (
    <FormWrapper
      type="program"
      path={`/api/programs/create`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchCreateProgram}
      defaultColorId={user.cid}
      defaultIconId={user.iid}
    />
  )
}
