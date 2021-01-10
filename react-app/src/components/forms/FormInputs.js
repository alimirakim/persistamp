import React from 'react'
import {
  Button, TextField, DialogActions, InputLabel, MenuItem, Select
} from '@material-ui/core'


export function EditButton({ handleOpen }) {
  return (
    <button onClick={handleOpen} style={{ color: "gray", backgroundColor: "rgba(0,0,0,0)", borderWidth: "0" }}>
      <i className={`fas fa-pencil-alt`}></i>
    </button>
  )
}


export function DeleteButton({ handleOpen }) {
  return (
    <button onClick={handleOpen} style={{ color: "gray", backgroundColor: "rgba(0,0,0,0)", borderWidth: "0" }}>
      <i className={`fas fa-eraser`}></i>
    </button>
  )
}


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


export function AddTitle({ title, setTitle }) {
  const updateTitle = (e) => setTitle(e.target.value)
  return (
    <TextField
      autoFocus
      defaultValue={title}
      margin="dense"
      id="title"
      label="Title"
      type="text"
      fullWidth
      onChange={updateTitle}
      required
    />
  )
}


export function AddDescription({ description, setDescription }) {
  const updateDescription = (e) => setDescription(e.target.value)
  return (
    <TextField
      autoFocus
      value={description}
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
      value={color}
    >
      {colors.map((color) => (
        <MenuItem key={color.id} value={color.id} style={{ backgroundColor: `${color.hex}` }} >
          {color.title.split("-").join(" ")}
        </MenuItem>
      ))}
    </Select>
  </>)
}

export function ChooseIcon({ icons, icon, setIcon, color }) {
  const updateIcon = (e) => setIcon(Number(e.target.value))
  return (<>
    <InputLabel id="icon">Icon</InputLabel>
    <Select onChange={updateIcon} labelId="icon" value={icon}>
      {icons.map((icon) => (
        <MenuItem key={icon.id} value={icon.id} style={{ color }}>
          <i className={`fas fa-${icon.title}`} style={{ color }}></i>
          {icon.title.split("-").join(" ")}
        </MenuItem>
      ))}
    </Select>
  </>)
}


export function ChooseFrequency({ frequency, updateFrequency }) {
  return (
    <Select onChange={updateFrequency} label="frequency" value={frequency}>
      <MenuItem value={1}>1 days</MenuItem>
      <MenuItem value={2}>2 days</MenuItem>
      <MenuItem value={3}>3 days</MenuItem>
      <MenuItem value={4}>4 days</MenuItem>
      <MenuItem value={5}>5 days</MenuItem>
      <MenuItem value={6}>6 days</MenuItem>
      <MenuItem value={7}>7 days</MenuItem>
    </Select>
  )
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

export function ChooseLimit({ limit, setLimit }) {
  const updateLimit = (e) => setLimit(e.target.value)

  return (<>
    <InputLabel id="limit">Limit per Member</InputLabel>
    <Select onChange={updateLimit} label="limit" value={limit}>
      <MenuItem value={-1}>--</MenuItem>
      {[...Array(10).keys()].map(i => (<MenuItem value={i + 1}>{i + 1}</MenuItem>))}
    </Select>
  </>)
}


export function ChooseQuantity({ quantity, setQuantity }) {
  const updateQuantity = (e) => setQuantity(e.target.value)

  return (<>
    <InputLabel id="quantity">Quantity</InputLabel>
    <Select onChange={updateQuantity} label="quantity" value={quantity}>
      <MenuItem value={-1}>--</MenuItem>
      {[...Array(101).keys()].map(i => (<MenuItem value={i + 1}>{i + 1}</MenuItem>))}
    </Select>
  </>)
}


export function ChooseCost({ cost, setCost }) {
  const updateCost = (e) => setCost(e.target.value)

  return (<>
    <InputLabel id="cost">Cost</InputLabel>
    <Select style={{ width: "500px" }} onChange={updateCost} label="cost" value={cost}>
      {[...Array(365).keys()].map(i => (<MenuItem value={i + 1}>{i + 1}</MenuItem>))}
    </Select>
  </>)
}

export function UpdateFirstname({ firstname, setFirstname }) {
  const updateName = (e) => setFirstname(e.target.value)

  return (<>
    <TextField label="First Name" type="text" fullWidth onChange={updateName} defaultValue={firstname} />
  </>)
}

export function UpdateLastname({ lastname, setLastname }) {
  const updateName = (e) => setLastname(e.target.value)

  return (<>
    <TextField label="Last Name" type="text" fullWidth onChange={updateName} defaultValue={lastname} />
  </>)
}
