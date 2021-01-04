import React, { useState, useContext } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import UserContext from '../context/UserContext';
import OptionsContext from '../context/OptionsContext'
import HabitBoardContext from '../context/HabitBoardContext'
import { editHabit } from '../context/reducers'
import { ActionOrCancelButtons, AddName, AddDescription, ChooseFrequency, ChooseColor, ChooseStamp } from './FormInputs'


export default function HabitEditForm({ habit }) {
  // console.log("habit to edit!", habit)
  const {user} = useContext(UserContext)
  const {dispatchHabits} = useContext(HabitBoardContext)
  const { colors, stamps } = useContext(OptionsContext)
  
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState(habit.habit)
  const [description, setDescription] = useState(habit.description)
  const [frequency, setFrequency] = useState(habit.frequency)
  const [color, setColor] = useState(habit.color.id)
  const [stamp, setStamp] = useState(habit.stamp.id)

  const handleClickOpen = () => {
    console.log("opened habit", habit)
    setOpen(true);
  }
  const handleClose = () => setOpen(false)

  const onEdit = async (e) => {
    e.preventDefault()
    setOpen(false)
    console.log("starting the edit...", name)
    const res = await fetch(`/api/habits/edit/${habit.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        habit: name,
        description,
        frequency,
        color,
        stamp,
        userId: user.id,
      })
    })
    const editedHabit = await res.json()

    dispatchHabits(editHabit(editedHabit))
    console.log("editted habit is...", editedHabit)
  }

if (!colors || !stamps || !stamp) return null

  return (
    <div>
      <button onClick={handleClickOpen} style={{color: "gray", backgroundColor: "rgba(0,0,0,0)", borderWidth: "0"}}>
      <i className={`fas fa-pencil-alt`}></i>
      </button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit "{habit.habit}" habit details</DialogTitle>

        <DialogContent>
          <AddName name={name} setName={setName} />
          <AddDescription description={description} setDescription={setDescription} />
          <ChooseFrequency frequency={frequency} setFrequency={setFrequency} />
          <ChooseColor colors={colors} color={color} setColor={setColor} />
          <ChooseStamp stamps={stamps} stamp={stamp} setStamp={setStamp} color={color} />
          <ActionOrCancelButtons handleClose={handleClose} onAction={onEdit} action={"Save"} />
        </DialogContent>

      </Dialog>
    </div>
  )
}
