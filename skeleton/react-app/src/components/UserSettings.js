import React, { useState, useContext, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import updateUser from '../services/user';
import UserContext from '../context/UserContext'
import OptionsContext from '../context/OptionsContext'
import { ActionOrCancelButtons, SetUsername, ChooseColor, ChooseStamp } from './FormInputs'

export default function UserSettings(){
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = useState(1)
  const [stamp, setStamp] = useState(3)
  const [username, setUsername] = useState("")
  const user = useContext(UserContext)
  const { colors, stamps } = useContext(OptionsContext)

  const handleClickOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false);
  }

  const onUpdate = async (e) => {
    e.preventDefault()
    const updatedUser = updateUser(username, color, stamp)
    console.log(updatedUser)
  }

  useEffect(() => {
  })

  return (
    <div>
      <button onClick={handleClickOpen}>Settings</button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit User Settings</DialogTitle>
        <DialogContent>
          <SetUsername username={username} setUsername={setUsername} />
          <ChooseColor colors={colors} color={color} setColor={setColor} />
          <ChooseStamp stamps={stamps} stamp={stamp} setStamp={setStamp} />
          <ActionOrCancelButtons handleClose={handleClose} onAction={onUpdate} action={"Update"} />
        </DialogContent>
      </Dialog>
    </div>
  )
}