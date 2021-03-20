import React, { useState, useContext } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import UserSettings from '../forms/UserSettings'
import { logout } from "../../services/auth";
import turtle from '../images/turtle.svg'

export default function NavBar({ auth, setAuth, setUser }) {
  const user = useContext(UserContext)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const history = useHistory();
  const onLogout = async (e) => {
    await logout();
    setAuth(false);
    return history.push('/login');
  };

  const handleSettingsOpen = () => setSettingsOpen(true)
  const handleSettingsClose = () => setSettingsOpen(false)

  if (auth && user) {
    return (<>
      <nav className="stickers">
        <NavLink to='/' className="sticker sticker_logo" activeClassName="active">
          <img className="logo" src={turtle} alt="Persistamp Logo: a red turtle stamp" />
        </NavLink>
        <NavLink to="/messages" className="sticker sticker_messages" activeClassName="active">
          <i className="fas fa-stamp"></i>
        </NavLink>
        <button onClick={handleSettingsOpen} className="sticker sticker_settings" activeClassName="active">
          <i className="fas fa-id-card"></i>
        </button>
        <NavLink to="/about" className="sticker sticker_about" activeClassName="active">
          <i className="fas fa-info-circle"></i>
        </NavLink>
        <button onClick={onLogout} className="sticker sticker_logout" activeClassName="active">
          <i className="fas fa-door-open"></i>
        </button>
      </nav>

      <UserSettings
        open={settingsOpen}
        handleClose={handleSettingsClose}
        user={user}
        setUser={setUser}
      />

    </>)
  } else {
    return (<>
      {/* <nav className="stickers">
        <NavLink to='/login' className="sticker sticker_logo-link" activeClassName="active">
          <img className="sticker_logo" src={turtle} alt="Persistamp Logo: a red turtle stamp" />
        </NavLink>
      </nav> */}
    </>)
  }
}
