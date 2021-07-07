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
  uniqueContent,
  resetUniqueInputs,
  defaultColorId,
  defaultIconId,
  edit,
  children
}) {
  const user = useContext(UserContext)
  const { colors, icons } = useContext(OptionsContext)
  const [errors, setErrors] = useState([])
  const [title, setTitle] = useState(edit ? edit.title : "")
  const [description, setDescription] = useState(edit ? edit.description : "")
  const [colorId, setColorId] = useState(edit ? edit.cid : defaultColorId)
  const [iconId, setIconId] = useState(edit ? edit.iid : defaultIconId)
  const [isDisabled, setIsDisabled] = useState(false)
  if (!resetUniqueInputs) resetUniqueInputs = () => null

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsDisabled(true)
    const res = await fetch(path, {
      method: edit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title, description, cid: colorId, iid: iconId, userId: user.id, ...uniqueContent
      })
    })
    const content = await res.json()
    if (content.errors) {
      setErrors(content.errors)
      setIsDisabled(false)
    } else {
      // console.log("content", content)
      handleClose()
      dispatcher(content)
      setErrors([])
      if (!edit) {
        setTitle("")
        setDescription("")
        setColorId(defaultColorId)
        setIconId(defaultIconId)
        resetUniqueInputs()
        setIsDisabled(false)
    }
    }
  }
  
  const checkKeyPress = (e) => {
    console.log("enter", e.key)
    if (e.key === "Enter") {
      onSubmit(e)
    } else if (e.key === "Esc") {
      handleClose()
    }
  }
  
  
if (!colorId) return null

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
      {edit ? `Edit ${type}: "${edit.title}"` : `Create ${type}`}
      </DialogTitle>

      <ErrorMessages errors={errors} />

      <DialogContent  style={{minWidth: "25rem"}}>
        <AddTitle title={title} setTitle={setTitle} setErrors={setErrors} checkKeyPress={checkKeyPress} />
        <AddDescription description={description} setErrors={setErrors} setDescription={setDescription} />
        {children}
        
        <IconInput color={colors[colorId].hex} icons={icons} value={iconId} setValue={setIconId} />
        <ColorInput icon={icons[iconId].title} colors={colors} value={colorId} setValue={setColorId} />
        <ActionOrCancelButtons handleClose={handleClose} onAction={onSubmit} action={edit ? "Save" : "Create"} isDisabled={isDisabled} />
      </DialogContent>

    </Dialog>
  )
}
