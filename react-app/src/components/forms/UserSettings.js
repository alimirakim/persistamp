

import React, { useState, useContext, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import UserContext from '../../context/UserContext'
import OptionsContext from '../../context/OptionsContext'
import {
  ActionOrCancelButtons,
  SetUsername,
  UpdateFirstname,
  UpdateLastname,
  UpdateBirthday,
} from '../forms/FormInputs'
import ColorInput from '../mylib/ColorInput'
import IconInput from '../mylib/IconInput'
import ErrorMessages from '../mylib/ErrorMessages'


export default function UserSettings({ open, handleClose, user, setUser }) {
  const { colors, icons } = useContext(OptionsContext)
  const [colorId, setColorId] = useState("")
  const [iconId, setIconId] = useState("")
  const [errors, setErrors] = useState([])
  const [firstname, setFirstname] = useState(user.first_name)
  const [lastname, setLastname] = useState(user.last_name)
  const [username, setUsername] = useState(user.username)
  const [birthday, setBirthday] = useState(user.birthday)
  const [openIcons, setOpenIcons] = useState(false)

  const toggleIcons = () => setOpenIcons(!openIcons)
  
  useEffect(() => {
    if (!user.errors) {
      setColorId(Object.values(colors).find(c => c.hex === user.color).id)
      setIconId(Object.values(icons).find(i => i.title === user.icon).id)
    }
  }, [user])
  

  const onUpdate = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/users/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, firstname, lastname, birthday, color: colorId, icon: iconId, }),
    })
    const updatedUser = await res.json()
    if (!updatedUser.errors) {
      setUser(updatedUser)
      handleClose()
    } else {
      setErrors(updatedUser.errors)
    }
  }

  if (!open) return null
  
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">User Settings</DialogTitle>

      <ErrorMessages errors={errors} />

      <DialogContent>
        <SetUsername username={username} setUsername={setUsername} />
        <UpdateFirstname firstame={firstname} setFirstname={setFirstname} />
        <UpdateLastname lastname={lastname} setLastname={setLastname} />
        <UpdateBirthday birthday={birthday} setBirthday={setBirthday} />
        <IconInput open={openIcons} color={colors[colorId].hex} icons={icons} value={iconId} setValue={setIconId} />
        <ColorInput icon={icons[iconId].title} colors={colors} value={colorId} setValue={setColorId} toggleIcons={toggleIcons} />
        <ActionOrCancelButtons handleClose={handleClose} onAction={onUpdate} action={"Update"} />
      </DialogContent>
    </Dialog>
  )
}