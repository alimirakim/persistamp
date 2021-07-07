import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button, TextField, DialogActions, InputLabel, MenuItem, Select
} from '@material-ui/core'
import CharCountIndicator from './utils/CharCountIndicator'

export function IconButton({ onClick, icon }) {
  return (
    <button className="ico-btn" onClick={onClick}>
      <i className={`lo-center fas fa-lg fa-${icon}`}></i>
    </button>
  )
}

export function DeleteButton({ switchForms }) {
  return (
    <div>
      <button onClick={switchForms} className="del-btn">
        <i className="fas fa-eraser" /> Delete
      </button>
    </div>
  )
}

export function AddButton({ handleOpen, styles }) {
  return (
    <button className="ico-btn" onClick={handleOpen}>
      <i className={`lo-center fas fa-2x fa-plus ${styles}`}></i>
    </button>
  )
}

export function RewardShopButton({ path, styles }) {
  return (
    <Link to={path}>
      <button className="ico-btn" type="button">
        <i className={`lo-center fas fa-2x fa-store ${styles}`}></i>
      </button>
    </Link>
  )
}


export function EditButton({ handleOpen, styles }) {
  return (
    <button className="ico-btn" onClick={handleOpen}>
      <i className={`lo-center fas fa-2x fa-pencil-alt ${styles}`}></i>
    </button>
  )
}



export function MiniEditButton({ handleOpen }) {
  return (
    <button className="mini-ico-btn" onClick={handleOpen}>
      <i className={`lo-center fas fa-pencil-alt`}></i>
    </button>
  )
}


export function MiniDeleteButton({ handleOpen }) {
  return (
    <button className="mini-ico-btn" onClick={handleOpen}>
      <i className={`lo-center fas fa-eraser`}></i>
    </button>
  )
}


export function ActionOrCancelButtons({ handleClose, onAction, action, isDisabled }) {

  return (
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
    </Button>
      <Button onClick={onAction} disabled={isDisabled} color="primary">
        {action}
      </Button>
    </DialogActions>
  )
}



export function AddTitle({ title, setTitle, checkKeyPress }) {

  const updateTitle = (e) => setTitle(e.target.value)

  return (<>
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
      maxLength={25}
      onKeyPress={checkKeyPress}
    />
    <CharCountIndicator length={title.length} maxLength={25} />
  </>)
}


export function AddDescription({ description, setDescription }) {
  const updateDescription = (e) => setDescription(e.target.value)
  return (<>
    <TextField
      value={description}
      margin="dense"
      id="description"
      label="Description"
      type="text"
      fullWidth
      onChange={updateDescription}
    />
    <CharCountIndicator length={description ? description.length : 0} maxLength={250} />
  </>)
}


export function ChooseFrequency({ frequency, updateFrequency }) {
  return (<div>
    <InputLabel id="frequency">Frequency</InputLabel>
    <Select onChange={updateFrequency} id="frequency" value={frequency} style={{ margin: "0.5rem 0" }}>
      <MenuItem value={1}>1 per week&nbsp;&nbsp;</MenuItem>
      <MenuItem value={2}>2 per week&nbsp;&nbsp;</MenuItem>
      <MenuItem value={3}>3 per week&nbsp;&nbsp;</MenuItem>
      <MenuItem value={4}>4 per week&nbsp;&nbsp;</MenuItem>
      <MenuItem value={5}>5 per week&nbsp;&nbsp;</MenuItem>
      <MenuItem value={6}>6 per week&nbsp;&nbsp;</MenuItem>
      <MenuItem value={7}>7 per week&nbsp;&nbsp;</MenuItem>
    </Select>
  </div>)
}

export function SetUsername({ username, setUsername, checkKeyPress }) {
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
      onKeyPress={checkKeyPress}
      onChange={updateUsername}
    />
  </>)
}

export function ChooseLimit({ limit, setLimit }) {
  const updateLimit = (e) => setLimit(e.target.value)

  return (
    <TextField
      onChange={updateLimit}
      label="Limit per Member"
      placeholder="(optional)"
      value={limit}
      type="number"
      InputProps={{ min: 1 }}
    />)
}


export function ChooseQuantity({ quantity, setQuantity, label }) {
  const updateQuantity = (e) => setQuantity(e.target.value)

  return (
    <TextField
      label="Quantity"
      placeholder="(optional)"
      onChange={updateQuantity}
      value={quantity}
      type="number"
      InputProps={{ min: 0 }}
    />
  )
}


// export function AddDescription({ description, setDescription }) {
//   const updateDescription = (e) => setDescription(e.target.value)
//   return (<>
//     <TextField
//       value={description}
//       margin="dense"
//       id="description"
//       label="Description"
//       type="text"
//       fullWidth
//       onChange={updateDescription}
//     />
//     <CharCountIndicator length={description ? description.length : 0} maxLength={250} />
//   </>)
// }


export function ChooseCost({ cost, setCost }) {
  const updateCost = (e) => {
    setCost(e.target.value)
  }

  return (
    <TextField
      value={cost}
      id="cost"
      label="Cost"
      type="number"
      onChange={updateCost}
      InputProps={{ min: 1 }}
    />
  )
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
    <div>
      <TextField
        label="Birthday"
        type="date"
        defaultValue={birthday}
        onChange={updateBirthday}
        InputLabelProps={{ shrink: true }}
      />
    </div>
  )
}