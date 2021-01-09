import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import UserContext from '../context/UserContext';
import UserSettings from './forms/UserSettings'
import { logout } from "../services/auth";
import turtle from '../images/turtle.svg'

export default function NavBar({ auth, setAuth, user }) {
  // const [isLoggedIn, setIsLoggedIn] = useState(auth)
  const [settingsOpen, setSettingsOpen] = useState(false)
  // console.log("NAVBAR", auth, setAuth, user)
  const onLogout = async (e) => {
    await logout();
    setAuth(false);
  };

  const handleSettingsOpen = () => setSettingsOpen(true)
  const handleSettingsClose = () => setSettingsOpen(false)

  if (auth && user) {
    return (<>
      <nav className="stickers">
        <NavLink to='/' className="sticker sticker_logo-link" activeClassName="active">
          <img className="sticker_logo" src={turtle} alt="Persistamp Logo: a red turtle stamp" />
        </NavLink>
        <NavLink to="/messages" className="sticker sticker_messages" activeClassName="active">
          <i className="fas fa-envelope"></i>
          <span>Messages</span>
        </NavLink>
        <button onClick={handleSettingsOpen} className="sticker sticker_settings" activeClassName="active">
          <i className="fas fa-id-card"></i>
          <span>Settings</span>
        </button>
        <NavLink to="/about" className="sticker sticker_about" activeClassName="active">
          <i className="fas fa-info-circle"></i>
        About
      </NavLink>
        <button onClick={onLogout} className="sticker sticker_logout" activeClassName="active">
          <i className="fas fa-door-open"></i>
        Logout
      </button>
      </nav>

      <UserSettings settingsOpen={settingsOpen} handleSettingsClose={handleSettingsClose} />
    </>)
  } else {
    return (<>
      <nav className="stickers">
        <NavLink to='/login' className="sticker sticker_logo-link" activeClassName="active">
          <img className="sticker_logo" src={turtle} alt="Persistamp Logo: a red turtle stamp" />
        </NavLink>
      </nav>
    </>)
  }
}
