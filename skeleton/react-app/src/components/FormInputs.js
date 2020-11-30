import React, { useState, useContext } from 'react'
import {
  Button, TextField, DialogActions, InputLabel, MenuItem, Select
} from '@material-ui/core'

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
  const updateName = (e) => setName(e.target.value)
  return (
    <TextField
      autoFocus
      defaultValue={name}
      margin="dense"
      id="name"
      label="Name"
      type="text"
      fullWidth
      onChange={updateName}
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

export function ChooseStamp({ stamps, stamp, setStamp, color }) {
  console.log("TODO set color of options to match chosen color", color)
  const updateStamp = (e) => setStamp(Number(e.target.value))
  return (<>
    <InputLabel id="stamp">Stamp</InputLabel>
    <Select onChange={updateStamp} labelId="stamp" defaultValue={stamp}>
      {stamps.map((stamp) => (
        <MenuItem key={stamp.id} value={stamp.id} style={{color: color}}>
          <i className={`fas fa-${stamp.stamp}`} style={{color: color}}></i>
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


export function ChooseLimit({ limit, setLimit }) {
  const updateLimit = (e) => setLimit(e.target.value)

  return (<>
    {/* <InputLabel id="limit">Limit per Member</InputLabel> */}
    <TextField label="Limit per member" type="number" defaultValue={-1} onChange={updateLimit} />
  </>)
}


export function ChooseQuantity({quantity, setQuantity}) {
  const updateQuantity = (e) => setQuantity(e.target.value)

  return (<>
    <InputLabel id="quantity">Total Quantity</InputLabel>
    <TextField label="Total quantity" type="number" defaultValue={-1} onChange={updateQuantity} />
  </>)
}


export function ChooseCost({cost, setCost}) {
  const updateCost = (e) => setCost(e.target.value)
  
  return (<>
  <InputLabel id="cost">Cost</InputLabel>
  <TextField label="Cost" type="number" defaultValue={7} onChange={updateCost} />
  </>)
}
