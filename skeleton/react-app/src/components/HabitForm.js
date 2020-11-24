import React from 'react'
import { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import {habitCreate} from '../services/auth';

function HabitForm() {
    const [open, setOpen] = React.useState(false);
    const [habit, setHabit] = useState("")
    const [description, setDescription] = useState("")
    const [frequency, setFrequency] = useState("")
    const [color, setColor] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

    const updateHabit = (e) => {
        setHabit(e.target.value);
    }

    const updateDesciption = (e) => {
        setDescription(e.target.value)
    }

    const updateFrequency = (e) => {
        setFrequency(e.target.value)
    }

    const updateColor = (e) => {
        setColor(e.target.value)
    }

    const onCreate = async (e) => {
      const newHabit = await habitCreate(
        habit,
        description,
        frequency,
        color,
        );
    }


    return (
        <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Habit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Please fill out the following fields to start your new Habit!</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Habit Name"
            type="text"
            fullWidth
            onChange={updateHabit}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            onChange={updateDesciption}
          />
          <InputLabel id="frequency">Frequency</InputLabel>
          <Select onChange={updateFrequency} labelId="frequency">
              <MenuItem value={7}>7 days</MenuItem>
              <MenuItem value={14}>14 days</MenuItem>
              <MenuItem value={30}>30 days</MenuItem>
          </Select>
          <InputLabel id="color">Color</InputLabel>
          <Select onCHange={updateColor} labelId="color">
              <MenuItem value={"Blue"}>Blue</MenuItem>
              <MenuItem value={"Green"}>Green</MenuItem>
              <MenuItem value={"Pink"}>Pink</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{
              handleClose()
              onCreate()
            }} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}

export default HabitForm
