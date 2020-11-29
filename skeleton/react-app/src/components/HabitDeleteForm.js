import React, { useContext } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import HabitBoardContext from '../context/HabitBoardContext'
import { deleteHabit } from '../context/reducers'
import { ActionOrCancelButtons } from './FormInputs'

export default function HabitDeleteForm({habit }) {
  const {dispatchHabits} = useContext(HabitBoardContext)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)

  const onDelete = async (e) => {
    e.preventDefault()
    setOpen(false)
    dispatchHabits(deleteHabit(habit))
    const res = await fetch(`/api/habits/delete/${habit.id}`, { method: "DELETE"})
    const deletedHabit = await res.json()
    console.log("deleted habit is...", deletedHabit)
  }
  
  return (
    <>
      <button onClick={handleClickOpen} style={{color: "gray", backgroundColor: "rgba(0,0,0,0)", borderWidth: "0"}}>
        <i className={`fas fa-trash`}></i>
      </button>


      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Habit: "{habit.habit}"</DialogTitle>

        <DialogContent>
        <strong>Are you SURE you want to delete this habit from {habit.program.program}?</strong>
          <ActionOrCancelButtons handleClose={handleClose} onAction={onDelete} action={"Delete"} />
        </DialogContent>

      </Dialog>
    </>
  )
}
