import React, { useContext } from 'react'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import { deleteHabit } from '../../context/reducers'
import DeleteForm from './DeleteForm'


export default function HabitDeleteForm({ open, handleClose, habit }) {
  const { dispatchHabits } = useContext(ProgramBoardContext)

  return (
    <DeleteForm
      path={`/api/habits/delete/${habit.id}`}
      open={open}
      handleClose={handleClose}
      itemType="program"
      item={habit}
      dispatcher={dispatchHabits}
      actionCreator={deleteHabit}
    />
  )
}

// export default function HabitDeleteForm({open, handleClose, habit }) {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false)

//   const onDelete = async (e) => {
//     e.preventDefault()
//     setOpen(false)
//     dispatchHabits(deleteHabit(habit))
//     const res = await fetch(, { method: "DELETE"})
//     const deletedHabit = await res.json()
//     console.log("deleted habit is...", deletedHabit)
//   }

//   return (
//     <>
//       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">Delete Habit: "{habit.title}"</DialogTitle>

//         <DialogContent>
//         <strong>Are you SURE you want to delete this habit?</strong>
//           <ActionOrCancelButtons handleClose={handleClose} onAction={onDelete} action={"Delete"} />
//         </DialogContent>

//       </Dialog>
//     </>
//   )
// }
