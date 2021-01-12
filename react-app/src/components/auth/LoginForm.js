import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { TextField, Button } from '@material-ui/core';

import { ActionOrCancelButtons } from '../forms/FormInputs';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import ErrorMessages from '../mylib/ErrorMessages'

export default function LoginForm({ auth, setAuth, setUser }) {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const user = await res.json()

    if (!user.errors) {
      setAuth(true)
      setUser(user)
      setOpen(false)
    }
    else setErrors(user.errors)
  }

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  if (auth) return <Redirect to="/" />

  return (<>
    <Button className='loginButton' onClick={handleClickOpen} variant="contained" color="secondary">
      Log in
    </Button>

    <Dialog open={open} onClose={handleClose}
      PaperProps={{
        style: { backgroundColor: "#FFD1D6"}
      }}
    >
      <DialogTitle id="form-dialog-title">Log in</DialogTitle>
      <DialogContent className='loginForm'>

        <ErrorMessages errors={errors} />

        <TextField
          autoFocus
          defaultValue={email}
          margin="dense"
          id="email"
          label="Email"
          type="text"
          fullWidth
          onChange={updateEmail}
          required
        />
        <TextField
          autoFocus
          defaultValue={password}
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          onChange={updatePassword}
          required
        />
        <ActionOrCancelButtons handleClose={handleClose} onAction={onLogin} action={"Log in"} />
      </DialogContent>
    </Dialog>
  </>)
};
