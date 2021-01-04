import React, { useState, useContext, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import updateUser from '../services/user';
import UserContext from '../context/UserContext'
import { editUser } from '../context/reducers'
import OptionsContext from '../context/OptionsContext'
import { ActionOrCancelButtons, SetUsername, ChooseColor, ChooseStamp, UpdateFirstname, UpdateLastname } from './FormInputs'

export default function UserSettings({ settingsOpen, handleSettingsClose }) {
  const { user, setUser } = useContext(UserContext)
  const [color, setColor] = useState(user.color.id)
  const [stamp, setStamp] = useState(user.stamp.id)
  const [errors, setErrors] = useState([])
  const [firstname, setFirstname] = useState(user.first_name)
  const [lastname, setLastname] = useState(user.last_name)
  const [username, setUsername] = useState(user.username)
  const { colors, stamps } = useContext(OptionsContext)

  const onUpdate = async (e) => {
    e.preventDefault()
    const updatedUser = await updateUser(username, firstname, lastname, color, stamp)
    if (!updatedUser.errors) {
      setUser(updatedUser)
      handleSettingsClose()
    } else {
      setErrors(updatedUser.errors)
    }
  }

  const renderErrors = (errors) => {
    if (errors) {
      return errors.map(error => {
        console.log(error)
        return <div className='material-error'>{error}</div>
      })
    }
  }

  if (!user) return null;
  return (

    <Dialog open={settingsOpen} onClose={handleSettingsClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit User Settings</DialogTitle>
      <div>
        {renderErrors(errors)}
      </div>
      <DialogContent>
        <SetUsername username={username} setUsername={setUsername} />
        <UpdateFirstname firstname={firstname} setFirstname={setFirstname} />
        <UpdateLastname lastname={lastname} setLastname={setLastname} />
        <ChooseColor colors={colors} color={color} setColor={setColor} />
        <ChooseStamp stamps={stamps} stamp={stamp} setStamp={setStamp} />
        <ActionOrCancelButtons handleClose={handleSettingsClose} onAction={onUpdate} action={"Update"} />
      </DialogContent>
    </Dialog>
  )
}