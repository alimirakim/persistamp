import React from 'react'
import { Link } from 'react-router-dom'
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@material-ui/core'

export default function Message({
  open,
  handleClose,
}) {

  if (!open) return null

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Thank you, friend! 😊</DialogTitle>

      <DialogContent style={{ textAlign: "center" }}>
        <p>We appreciate your interest! Under construction: friends, messaging, and accountability buddies! Please look forward to it!</p>

        <p>Find our repo here: </p>
        <a href="https://github.com/alimirakim/persistamp" target="_blank">
          <Button variant="contained" size="large" color="secondary">GitHub: Persistamp</Button>
        </a>

        <h3><strong>NOTICE!</strong></h3>
        <p>David Lee and Alicia Kim are job-seeking!</p>
        <p>Check <Link to="/about">[About Us]</Link> for more!</p>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Got it! 💗
          </Button>
        </DialogActions>
      </DialogContent>

    </Dialog>
  )
}
