import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { FormControl, TextField, Button } from '@material-ui/core';
import { ActionOrCancelButtons } from '../FormInputs';
import SignUpForm from './SignUpForm';
import '../../styles/layouts.css'


const LoginForm = ({ authenticated, setAuthenticated, setUser }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      setUser(user)
    } else {
      setErrors(user.errors);
    }
  };
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  const updateEmail = (e) => setEmail(e.target.value);

  const updatePassword = (e) => setPassword(e.target.value);

  if (authenticated) return <Redirect to="/" />

  return (<>
    <SignUpForm open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} authenticated={authenticated} setAuthenticated={setAuthenticated} setUser={setUser} />
   <div className="loginContainer">
     <div>
      <div>
        {errors.map((error) => (
          <div className="loginHeader errorHeader">{error}</div>
        ))}
      </div>
      <h2 className="loginHeader">Persistamp</h2>
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

export default LoginForm;
