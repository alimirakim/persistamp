import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button
} from '@material-ui/core'


export default function Message({ open, handleClose }) {

  if (!open) return null

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Thanks for visiting! 😊</DialogTitle>

      <DialogContent style={{ textAlign: "center" }}>

        <p>See our repo: </p>
        <a href="https://github.com/alimirakim/persistamp" target="_blank">
          <Button variant="contained" size="large" color="secondary">
            GitHub: Persistamp
          </Button>
        </a>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Got it! 💗
          </Button>
        </DialogActions>
      </DialogContent>

    </Dialog>
  )
}
