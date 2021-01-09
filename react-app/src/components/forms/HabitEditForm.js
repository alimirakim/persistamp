import React, { useState, useContext } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import UserContext from '../../context/UserContext';
import OptionsContext from '../../context/OptionsContext'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import { editHabit } from '../../context/reducers'
import { ActionOrCancelButtons, AddTitle, AddDescription, ChooseFrequency, ChooseColor, ChooseIcon } from './FormInputs'


export default function HabitEditForm({ habit }) {
  const { user } = useContext(UserContext)
  const { dispatchHabits } = useContext(ProgramBoardContext)
  const { colors, icons } = useContext(OptionsContext)

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState(habit.title)
  const [description, setDescription] = useState(habit.description)
  const [frequency, setFrequency] = useState(habit.frequency)
  const [color, setColor] = useState(habit.color)
  const [icon, setIcon] = useState(habit.icon)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onEdit = async (e) => {
    e.preventDefault()
    setOpen(false)
    const res = await fetch(`/api/habits/edit/${habit.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        frequency,
        color,
        icon,
        userId: user.id,
      })
    })
    const editedHabit = await res.json()
    dispatchHabits(editHabit(editedHabit))
  }

  if (!colors || !icons || !icon) return null

  return (
    <div>
      <button onClick={handleClickOpen} style={{ color: "gray", backgroundColor: "rgba(0,0,0,0)", borderWidth: "0" }}>
        <i className={`fas fa-pencil-alt`}></i>
      </button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit "{habit.title}" habit details</DialogTitle>

        <DialogContent>
          <AddTitle title={title} setTitle={setTitle} />
          <AddDescription description={description} setDescription={setDescription} />
          <ChooseFrequency frequency={frequency} setFrequency={setFrequency} />
          <ChooseColor colors={colors} color={color} setColor={setColor} />
          <ChooseIcon icons={icons} icon={icon} setIcon={setIcon} color={color} />
          <ActionOrCancelButtons handleClose={handleClose} onAction={onEdit} action={"Save"} />
        </DialogContent>

      </Dialog>
    </div>
  )
}
