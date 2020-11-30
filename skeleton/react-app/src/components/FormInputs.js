import React, { useState, useContext } from 'react'
import {
  Button, TextField, DialogActions, InputLabel, MenuItem, Select
} from '@material-ui/core'
import updateUser from '../services/user'

export function ActionOrCancelButtons({ handleClose, onAction, action }) {
  return (
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
    <Button onClick={onAction} color="primary">
      {action}
    </Button>
  </DialogActions>
  )
}


export function AddName({ name, setName }) {
  const updateHabit = (e) => setName(e.target.value)
  return (
    <TextField
      autoFocus
      defaultValue={name}
      margin="dense"
      id="name"
      label="Name"
      type="text"
      fullWidth
      onChange={updateHabit}
      required
    />
  )
}


export function AddDescription({ description, setDescription }) {
  const updateDescription = (e) => setDescription(e.target.value)
  return (
    <TextField
      autoFocus
      defaultValue={description}
      margin="dense"
      id="description"
      label="Description"
      type="text"
      fullWidth
      onChange={updateDescription}
    />
  )
}


export function ChooseColor({ colors, color, setColor }) {
  const updateColor = (e) => setColor(parseInt(e.target.value))
  console.log("EDIT COLOR DEFAULT?", color)
  return (<>
    <InputLabel id="color">Color</InputLabel>
    <Select 
      onChange={updateColor} 
      labelId="color" 
      defaultValue={color}
      >
      {colors.map((color) => (
        <MenuItem key={color.id} value={color.id} style={{ backgroundColor: `${color.hex}` }} >
          {color.name.split("-").join(" ")}
        </MenuItem>
      ))}
    </Select>
  </>)
}

export function ChooseStamp({ stamps, stamp, setStamp }) {
  const updateStamp = (e) => setStamp(e.target.value)
  return (<>
    <InputLabel id="stamp">Stamp</InputLabel>
    <Select onChange={updateStamp} labelId="stamp" defaultValue={stamp}>
      {stamps.map((stamp) => (
        <MenuItem key={stamp.id} value={stamp.id}>
          <img
            src={`/icons/${stamp.stamp}.svg`}
            alt={`${stamp.type} Stamp: ${stamp.stamp.split("-").join(" ")}`}
            style={{ width: "1rem", height: "1rem" }}
          />
          {stamp.stamp.split("-").join(" ")}
        </MenuItem>
      ))}
    </Select>
  </>)
}


export function ChooseFrequency({ frequency, setFrequency }) {

  const updateFrequency = (e) => setFrequency(e.target.value)

  return (<>
    <InputLabel id="frequency" > Frequency</InputLabel>
    <Select onChange={updateFrequency} labelId="frequency" defaultValue={frequency}>
      <MenuItem value={1}>1 days</MenuItem>
      <MenuItem value={2}>2 days</MenuItem>
      <MenuItem value={3}>3 days</MenuItem>
      <MenuItem value={4}>4 days</MenuItem>
      <MenuItem value={5}>5 days</MenuItem>
      <MenuItem value={6}>6 days</MenuItem>
      <MenuItem value={7}>7 days</MenuItem>
    </Select>
  </>)
}

export function SetUsername({ username, setUsername }) {
  const updateUsername = (e) => setUsername(e.target.value)
  return (<>
    <TextField
      autoFocus
      defaultValue={username}
      margin="dense"
      id="username"
      label="Username"
      type="text"
      fullWidth
      onChange={updateUsername}
    />
  </>)
}