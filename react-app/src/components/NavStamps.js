import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';
import UserSettings from './forms/UserSettings'
import { logout } from "../services/auth";
import ProgramForm from './forms/ProgramForm'



export default function NavStamps({ auth, setAuth, setUser }) {
  const user = useContext(UserContext)
  const [openSettings, setOpenSettings] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)

  const onLogout = async (e) => {
    await logout();
    setAuth(false);
  };

  const toggleCreate = (e) => setOpenCreate(!openCreate)
  const toggleSettings = (e) => setOpenSettings(!openSettings)
  const showPlaceholder = (e) => window.alert("Under Construction! :B Thank you for your interest!")

  if (auth && user) {
    return (<>
    
      <ProgramForm open={openCreate} handleClose={toggleCreate} />
      
      <nav className="stamps">
        
        
        <button onClick={toggleCreate} className=" nav-stamp stamp_program" activeClassName="active">
        <div className="th-metal-light stamp-title">+Program</div>
          <i className="lo-center fas fa-2x fa-stamp" />
        </button>
        
        <button onClick={showPlaceholder} className=" nav-stamp stamp_messages" activeClassName="active">
        <div className="th-metal-light stamp-title">Messages</div>
          <i className="lo-center fas fa-2x fa-envelope" />
        </button>
        
        <button onClick={toggleSettings} className=" nav-stamp stamp_settings" activeClassName="active">
        <div className="th-metal-light stamp-title">Settings</div>
          <i className="lo-center fas fa-2x fa-id-card" />
        </button>
        
        <NavLink to="/about" className="nav-stamp stamp_about" activeClassName="active">
        
        <div className="th-metal-light stamp-title">About</div>
          <i className="lo-center fas fa-2x fa-info-circle" />
        </NavLink>
        
        <button onClick={onLogout} className=" nav-stamp stamp_logout" activeClassName="active">
        <div className="th-metal-light stamp-title">Logout</div>
          <i className="lo-center fas fa-2x fa-door-open" />
        </button>
        
      </nav>

      <UserSettings open={openSettings} handleClose={toggleSettings} user={user} setUser={setUser} />

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
