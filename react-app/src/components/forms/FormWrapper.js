import React, { useState, useContext } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import UserContext from '../../context/UserContext';
import OptionsContext from '../../context/OptionsContext'
import { ActionOrCancelButtons, AddTitle, AddDescription } from './FormInputs'
import ColorInput from '../mylib/ColorInput'
import IconInput from '../mylib/IconInput'
import ErrorMessages from '../mylib/ErrorMessages'

export default function FormWrapper({
  type,
  path,
  open,
  handleClose,
  dispatcher,
  actionCreator,
  uniqueContent,
  uniqueInputs: UniqueInputs,
  edit,
}) {
  const { user } = useContext(UserContext)
  const { colors, icons } = useContext(OptionsContext)

  const [errors, setErrors] = useState([])
  const [title, setTitle] = useState(edit ? edit.title : "")
  const [description, setDescription] = useState(edit ? edit.description : "")
  const [color, setColor] = useState(edit ? Object.values(colors).find(c => c.hex = edit.color).id : 1)
  const [icon, setIcon] = useState(edit ? Object.values(icons).find(i => i.title = edit.icon).id : 1)
  const [openIcons, setOpenIcons] = useState(false)

  const toggleIcons = () => setOpenIcons(!openIcons)

  const onSubmit = async (e) => {
    e.preventDefault()
    handleClose()
    const res = await fetch(path, {
      method: edit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title, description, color, icon, userId: user.id, ...uniqueContent
      })
    })
    const content = await res.json()
    if (content.errors) {
      setErrors(content.errors)
    } else {
      dispatcher(actionCreator(content))
      // setErrors([])
      // setTitle("")
      // setDescription("")
      // setColor(1)
      // setIcon(1)
      // setOpenIcons(false)
    }
  }


  if (!colors || !icon) return null
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{edit ? `Edit "${edit.title}" ${type} details` : `Add a new ${type}.`}</DialogTitle>

      <ErrorMessages errors={errors} />

      <DialogContent>
        <AddTitle title={title} setTitle={setTitle} />
        <AddDescription description={description} setDescription={setDescription} />
        <ColorInput icon={icons[icon].title} colors={colors} value={color} setValue={setColor} toggleIcons={toggleIcons} />
        <IconInput open={openIcons} color={colors[color].hex} icons={icons} value={icon} setValue={setIcon} />
        <UniqueInputs />
        <ActionOrCancelButtons handleClose={handleClose} onAction={onSubmit} action={edit ? "Save" : "Create"} />
      </DialogContent>

    </Dialog>
  )
}
