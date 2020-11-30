import React, { useState, useContext } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import UserContext from '../context/UserContext';
import OptionsContext from '../context/OptionsContext';
import HabitBoardContext from '../context/HabitBoardContext'
import { habitCreate } from '../services/auth';
import { createHabit } from '../context/reducers'
import { ActionOrCancelButtons, AddName, AddDescription, ChooseFrequency, ChooseColor, ChooseStamp } from './FormInputs'

function HabitForm({ pid, program }) {
  const {user} = useContext(UserContext)
  const { colors, stamps } = useContext(OptionsContext)
  const {dispatchHabits} = useContext(HabitBoardContext)
  
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [frequency, setFrequency] = useState(7)
  const [color, setColor] = useState(1)
  const [stamp, setStamp] = useState(3)

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)

  const onCreate = async (e) => {
    e.preventDefault()
    setOpen(false)
    const userId = user.id
    const newHabit = await habitCreate(
      name,
      description,
      frequency,
      color,
      stamp,
      userId,
      pid,
    )
    dispatchHabits(createHabit(newHabit))
    // Resetting form defaults
    setName()
    setDescription()
    setFrequency(7)
    setColor(1)
    setStamp(3)

    console.log("new habit is...", newHabit)
  }

  if (!colors || !stamps) return null

  return (
    <>
      <button onClick={handleClickOpen}>Create Habit</button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a habit to {program}!</DialogTitle>

        <DialogContent>
          <AddName name={name} setName={setName} />
          <AddDescription description={description} setDescription={setDescription} />
          <ChooseFrequency frequency={frequency} setFrequency={setFrequency} />
          <ChooseColor colors={colors} color={color} setColor={setColor} />
          <ChooseStamp stamps={stamps} stamp={stamp} setStamp={setStamp} color={color} />
          <ActionOrCancelButtons handleClose={handleClose} onAction={onCreate} action={"Create"} />
        </DialogContent>

      </Dialog>
    </>
  )
}

export default HabitForm
