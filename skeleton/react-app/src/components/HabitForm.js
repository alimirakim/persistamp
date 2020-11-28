import React, { useState, useContext } from 'react'
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select
} from '@material-ui/core'
import { habitCreate } from '../services/auth';
import UserContext from '../context/UserContext';
import OptionsContext from '../context/OptionsContext';
import HabitBoardContext from '../context/HabitBoardContext'
import { createHabit } from '../context/reducers'

function HabitForm({ pid, program, dispatchHabits }) {
  const [open, setOpen] = React.useState(false);
  const [habit, setHabit] = useState()
  const [description, setDescription] = useState()
  const [frequency, setFrequency] = useState(7)
  const [color, setColor] = useState(1)
  const [stamp, setStamp] = useState(3)
  const user = useContext(UserContext);
  const { colors, stamps } = useContext(OptionsContext)
  const { habits } = useContext(HabitBoardContext)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateHabit = (e) => {
    setHabit(e.target.value);
  }

  const updateDescription = (e) => {
    setDescription(e.target.value)
  }

  const updateFrequency = (e) => {
    setFrequency(e.target.value)
  }

  const updateColor = (e) => {
    console.log(parseInt(e.target.value))
    setColor(parseInt(e.target.value))
  }

  const updateStamp = (e) => {
    setStamp(e.target.value)
  }

  const onCreate = async (e) => {
    e.preventDefault()
    const userId = user.id
    const newHabit = await habitCreate(
      habit,
      description,
      frequency,
      color,
      stamp,
      userId,
      pid,
    )
    // Resetting form defaults
    setHabit()
    setDescription()
    setFrequency(7)
    setColor(1)
    setStamp(3)

    dispatchHabits(createHabit(newHabit))
    console.log("new habit is...", newHabit)
  }

  if (!colors || !stamps) return null

  return (
    <div>
      <button onClick={handleClickOpen}>
        Create Habit
      </button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a habit to {program}!</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Habit Name"
            type="text"
            fullWidth
            onChange={updateHabit}
            required
          />

          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            onChange={updateDescription}
          />

          <InputLabel id="frequency">Frequency</InputLabel>
          <Select onChange={updateFrequency} labelId="frequency" defaultValue={7}>
            <MenuItem value={1}>1 days</MenuItem>
            <MenuItem value={2}>2 days</MenuItem>
            <MenuItem value={3}>3 days</MenuItem>
            <MenuItem value={4}>4 days</MenuItem>
            <MenuItem value={5}>5 days</MenuItem>
            <MenuItem value={6}>6 days</MenuItem>
            <MenuItem value={7}>7 days</MenuItem>
          </Select>

          <InputLabel id="color">Color</InputLabel>
          <Select onChange={updateColor} labelId="color" defaultValue={1}>
            {colors.map((color) => (
              <MenuItem value={color.id} style={{ backgroundColor: `${color.hex}` }} >
                {color.name.split("-").join(" ")}
              </MenuItem>
            ))}
          </Select>

          <InputLabel id="stamp">Stamp</InputLabel>
          <Select onChange={updateStamp} labelId="stamp" defaultValue={3}>
            {stamps.map((stamp) => (
              <MenuItem value={stamp.id}>
                <img src={`/icons/${stamp.stamp}.svg`} alt={`${stamp.type} Stamp: ${stamp.stamp.split("-").join(" ")}`} style={{ width: "1rem", height: "1rem" }} />
                {stamp.stamp.split("-").join(" ")}
              </MenuItem>
            ))}
          </Select>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => {
            handleClose()
            onCreate(e)
          }} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default HabitForm
