import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { TextField, Button } from '@material-ui/core';
import SignUpForm from './SignUpForm';


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
    }
    else setErrors(user.errors)
  }

  const onDemoLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "demo@gmail.com", password: "password" })
    })
    const user = await res.json()
      console.log("redirect", user)
      if (!user.errors) {
      setAuth(true)
      setUser(user)
    }
    else setErrors(user.errors)
  }

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  const updateEmail = (e) => setEmail(e.target.value);

  const updatePassword = (e) => setPassword(e.target.value);

  console.log("auth", auth)
  if (auth) return <Redirect to="/" />

  return (<>
    <SignUpForm
      open={open}
      setOpen={setOpen}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      auth={auth}
      setAuth={setAuth}
    />
    <div className="loginContainer">
      <div>
        <div>
          {errors.map((error) => (
            <div className="loginHeader errorHeader">{error}</div>
          ))}
        </div>
        <h2 className="loginHeader">Persistamp</h2>

        <button onClick={onDemoLogin} className="btn">Demo Login</button>
        <form onSubmit={onLogin}>
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
          {/* <button type="submit">Login</button> */}
          <Button onClick={onLogin} color="primary">
            Login
          </Button>
          <Button onClick={handleClickOpen} color="primary">
            Sign up
          </Button>
        </form>

      </div>
    </div>

  </>);
};
