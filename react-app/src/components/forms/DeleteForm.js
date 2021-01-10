import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import { ActionOrCancelButtons } from './FormInputs'

export default function DeleteForm({ 
  path,
  open, 
  handleClose, 
  itemType, 
  item,
  dispatcher, 
  actionCreator, 
  }) {

  const onDelete = async (e) => {
    e.preventDefault()
    setOpen(false)
    dispatcher(actionCreator(item))
    const res = await fetch(path, { method: "DELETE"})
  }
  
  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete {itemType}: "{item.title}"</DialogTitle>

        <DialogContent>
        <strong>Are you SURE you want to delete this {itemType}?</strong>
          <ActionOrCancelButtons handleClose={handleClose} onAction={onDelete} action={"Delete"} />
        </DialogContent>

      </Dialog>
    </>
  )
}
