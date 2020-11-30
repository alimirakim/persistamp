import React, { useState, useContext, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import updateUser from '../services/user';
import UserContext from '../context/UserContext'
import OptionsContext from '../context/OptionsContext'
import { ActionOrCancelButtons, SetUsername, ChooseColor, ChooseStamp, UpdateFirstname, UpdateLastname } from './FormInputs'

export default function UserSettings(){
  const user = useContext(UserContext).user
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = useState(user.color.id)
  const [stamp, setStamp] = useState(user.stamp.id)
  const [firstname, setFirstname] = useState(user.first_name)
  const [lastname, setLastname] = useState(user.last_name)
  const [username, setUsername] = useState(user.username)
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
    console.log(user)
  }, [open])

  return (
    <div>
      <button onClick={handleClickOpen}>Settings</button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit User Settings</DialogTitle>
        <DialogContent>
          <SetUsername username={username} setUsername={setUsername} />
          <UpdateFirstname firstname={firstname} setFirstname={setFirstname} />
          <UpdateLastname lastname={lastname} setLastname={setLastname} />
          <ChooseColor colors={colors} color={color} setColor={setColor} />
          <ChooseStamp stamps={stamps} stamp={stamp} setStamp={setStamp} />
          <ActionOrCancelButtons handleClose={handleClose} onAction={onUpdate} action={"Update"} />
        </DialogContent>
      </Dialog>
    </div>
  )
}