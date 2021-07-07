import React, { useContext, useState } from 'react'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import UserContext from '../../context/UserContext'
import FormWrapper from './FormWrapper'


export default function ProgramForm({ open, handleClose }) {
  const { dispatchCreateProgram } = useContext(ProgramBoardContext)
  const user = useContext(UserContext)
  const [hasShop, setHasShop] = useState(false)

  const updateHasShop = (e) => setHasShop(!hasShop)

  const resetUniqueInputs = (e) => {
    setHasShop(false)
  }

  if (!open) return null

  return (
    <FormWrapper
      type="program"
      path={`/api/programs/create`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchCreateProgram}
      uniqueContent={{ hasShop }}
      resetUniqueInputs={resetUniqueInputs}
      defaultColorId={user.cid}
      defaultIconId={user.iid}
    >
      <label>Add program shop
        <input type="checkbox" checked={hasShop} onClick={updateHasShop} />
      </label>
    </FormWrapper>
  )
}
