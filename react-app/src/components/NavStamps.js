import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import UserSettings from './forms/UserSettings'
import { logout } from "../services/auth";
import turtle from '../images/turtle.svg'

export default function NavStamps({ auth, setAuth, setUser }) {
  const user = useContext(UserContext)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const onLogout = async (e) => {
    await logout();
    setAuth(false);
  };

  const handleSettingsOpen = () => setSettingsOpen(true)
  const handleSettingsClose = () => setSettingsOpen(false)

  if (auth && user) {
    return (<>
      <nav className="stamps">
        <NavLink to="/messages" className="nav-stamp stamp_program" activeClassName="active">
          <i className="fas fa-stamp">  Create Program</i>
        </NavLink>
        <button onClick={handleSettingsOpen} className="nav-stamp stamp_settings" activeClassName="active">
          <i className="fas fa-id-card">  User Settings</i>
        </button>
        <NavLink to="/about" className="nav-stamp stamp_about" activeClassName="active">
          <i className="fas fa-info-circle">   About</i>
        </NavLink>
        <button onClick={onLogout} className="nav-stamp stamp_logout" activeClassName="active">
          <i className="fas fa-door-open">  Logout</i>
        </button>
      </nav>

      <UserSettings open={settingsOpen} handleClose={handleSettingsClose} user={user} setUser={setUser} />

    </>)
  } else {
    return (<>
      {/* <nav className="nav-stamps">
        <NavLink to='/login' className="nav-stamp nav-stamp_logo-link" activeClassName="active">
          <img className="nav-stamp_logo" src={turtle} alt="Persistamp Logo: a red turtle stamp" />
        </NavLink>
      </nav> */}
    </>)
  }
}
