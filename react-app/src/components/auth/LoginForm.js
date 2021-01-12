import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { TextField, Button } from '@material-ui/core';
import SignUpForm from './SignUpForm';

import { ActionOrCancelButtons } from '../forms/FormInputs';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'


const LoginForm = ({ auth, setAuth, loadUserData }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    const content = await login(email, password)
    if (!content.errors) loadUserData(content)
    else setErrors(content.errors)
  }

  const onDemoLogin = async (e) => {
    e.preventDefault();
    const content = await login("demo@gmail.com", "password")
    if (!content.errors) loadUserData(content)
    else setErrors(content.errors)
  }

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const renderErrors = (errors) => {
    if (errors) {
      // console.log("trying to render user setting errors")
      return errors.map(error => {
        // console.log(error)
        return <div className='material-error errorHeader'>{error}</div>
      })
    }
  }

  if (auth) return <Redirect to="/" />

  return (<>
    {/* <div className="loginContainer">
      <div> */}
        <div>
          {errors.map((error) => (
            <div className="loginHeader errorHeader">{error}</div>
          ))}
        </div>
        {/* <h2 className="loginHeader">Persistamp</h2> */}
        <Button onClick={handleClickOpen} color="primary">
          Log in
        </Button>
        <button onClick={onDemoLogin} className="btn">Demo Login</button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">Log in</DialogTitle>
          {/* <div>
            {renderErrors}
          </div> */}
          <DialogContent className='loginForm'>
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

      {/* </div>
    </div> */}

  </>);
};

export default LoginForm;
