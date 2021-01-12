import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button, TextField, DialogActions, InputLabel, MenuItem, Select
} from '@material-ui/core'


export function Icon(props) {
  return <i className={`fas fa-${props.icon}`}></i>
}


export function getColorId(colors, hex) {
  return Object.values(colors).find(c => c.hex == hex).id
}


export function getIconId(icons, title) {
  return Object.values(icons).find(i => i.title == title).id
}


export function BackButton(path, color) {
  return (
    <Link to={path}>
      <i className={`fas fa-chevron-circle-left`} style={{ color }}></i>
    </Link>
  )
}


export function IconButton({ onClick, icon }) {
  return (
    <button className="ico-btn" onClick={onClick}>
      <i className={`fas fa-lg fa-${icon}`}></i>
    </button>
  )
}

export function AddButton({ handleOpen }) {
  return (
    <button className="ico-btn" onClick={handleOpen}>
      <i className={`fas fa-2x fa-plus`}></i>
    </button>
  )
}

export function RewardShopButton({ path }) {
  return (
    <Link to={path}>
      <button className="ico-btn" type="button">
        <i className={`fas fa-2x fa-store`}></i>
      </button>
    </Link>
  )
}


export function EditButton({ handleOpen }) {
  return (
    <button className="ico-btn" onClick={handleOpen}>
      <i className={`fas fa-2x fa-pencil-alt`}></i>
    </button>
  )
}


export function DeleteButton({ handleOpen }) {
  return (
    <button className="ico-btn" onClick={handleOpen}>
      <i className={`fas fa-2x fa-eraser`}></i>
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


export function ChooseFrequency({ frequency, updateFrequency }) {
  return (<>
    <InputLabel id="frequency">Frequency</InputLabel>
    <Select onChange={updateFrequency} id="frequency" value={frequency} style={{ margin: "0.5rem 0" }}>
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
  const updateName = (e) => {
    setFirstname(e.target.value)
  }

  return (
    <TextField
      label="First Name"
      type="text"
      onChange={updateName}
      defaultValue={firstname}
    />
  )
}

export function UpdateLastname({ lastname, setLastname }) {
  const updateName = (e) => setLastname(e.target.value)

  return (
    <TextField
      label="Last Name"
      type="text"
      onChange={updateName}
      defaultValue={lastname}
    />
  )
}

export function UpdateBirthday({ birthday, setBirthday }) {
  const updateBirthday = (e) => {
    setBirthday(e.target.value)
  }

  return (
    <TextField
      label="Birthday"
      type="date"
      defaultValue={birthday}
      onChange={updateBirthday}
      InputLabelProps={{ shrink: true }}
    />
  )
}