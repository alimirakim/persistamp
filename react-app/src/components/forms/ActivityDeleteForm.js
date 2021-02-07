import React, {useContext} from 'react'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import DeleteForm from './DeleteForm'


export default function ActivityDeleteForm({ open, handleClose, activity}) {
const {dispatchDeleteActivity} = useContext(ProgramBoardContext)
  if (!open) return null
  
  return (
    <DeleteForm
      path={`/api/activities/delete/${activity.id}`}
      open={open}
      handleClose={handleClose}
      itemType="program"
      item={activity}
      dispatcher={dispatchDeleteActivity}
    />
  )
}
