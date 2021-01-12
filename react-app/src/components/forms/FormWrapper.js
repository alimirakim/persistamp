import React, { useState, useContext } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import UserContext from '../../context/UserContext';
import OptionsContext from '../../context/OptionsContext'
import { ActionOrCancelButtons, AddTitle, AddDescription, getColorId, getIconId } from './FormInputs'
import ColorInput from '../mylib/ColorInput'
import IconInput from '../mylib/IconInput'
import ErrorMessages from '../mylib/ErrorMessages'


export default function FormWrapper({
  type,
  path,
  open,
  handleClose,
  dispatcher,
  uniqueContent,
  resetUniqueInputs,
  uniqueInputs: UniqueInputs,
  defaultColor,
  defaultIcon,
  edit,
}) {
  const user = useContext(UserContext)
  const { colors, icons } = useContext(OptionsContext)

  const [errors, setErrors] = useState([])
  const [title, setTitle] = useState(edit ? edit.title : "")
  const [description, setDescription] = useState(edit ? edit.description : "")
  const [colorId, setColorId] = useState(edit ? getColorId(colors, edit.color) : getColorId(colors, defaultColor))
  const [iconId, setIconId] = useState(edit ? getIconId(icons, edit.icon) : getIconId(icons, defaultIcon))
  if (!UniqueInputs) UniqueInputs = () => (<></>)
  if (!resetUniqueInputs) resetUniqueInputs = () => console.log("")

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(path, {
      method: edit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title, description, color: colorId, icon: iconId, userId: user.id, ...uniqueContent
      })
    })
    const content = await res.json()
    if (content.errors) {
      setErrors(content.errors)
    } else {
      handleClose()
      dispatcher(content)
      setErrors([])
      if (!edit) {
        setTitle("")
        setDescription("")
        setColorId(getColorId(colors, defaultColor))
        setIconId(getIconId(icons, defaultIcon))
        resetUniqueInputs()
      }
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{edit ? `Edit "${edit.title}" ${type} details` : `Add a new ${type}.`}</DialogTitle>

      <ErrorMessages errors={errors} />

      <DialogContent>
        <AddTitle title={title} setTitle={setTitle} />
        <AddDescription description={description} setDescription={setDescription} />
        <UniqueInputs />
        <IconInput color={colors[colorId].hex} icons={icons} value={iconId} setValue={setIconId} />
        <ColorInput icon={icons[iconId].title} colors={colors} value={colorId} setValue={setColorId} />
        <ActionOrCancelButtons handleClose={handleClose} onAction={onSubmit} action={edit ? "Save" : "Create"} />
      </DialogContent>

    </Dialog>
  )
}
