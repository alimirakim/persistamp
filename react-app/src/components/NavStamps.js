import React, { useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import UserSettings from './forms/UserSettings'
import { logout } from "../services/auth";
import ProgramForm from './forms/ProgramForm'
import turtle from '../images/turtle.svg'


export default function NavStamps({ auth, setAuth, setUser }) {
  const user = useContext(UserContext)
  const [openSettings, setOpenSettings] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const history = useHistory();
  console.log("history", history)
  
  const onLogout = async (e) => {
    await logout();
    setAuth(false);
    return history.push('/');
  };

  const toggleCreate = (e) => setOpenCreate(!openCreate)
  const toggleSettings = (e) => setOpenSettings(!openSettings)
  const showPlaceholder = (e) => window.alert("Message for our Lovely Guest\nUnder Construction! :B Thank you for your visit!\n\nCheck out Persistamp's GitHub page!\nhttps://github.com/alimirakim/persistamp")

  if (auth && user) {
    return (<>

      <ProgramForm open={openCreate} handleClose={toggleCreate} />

      <nav className="stamps">

{history.location.pathname === "/" &&
        <button onClick={toggleCreate} className=" nav-stamp stamp_program" activeClassName="active">
        <div className="th-metal-light stamp-title">+Program</div>
          <i className="lo-center fas fa-2x fa-stamp" />
        </button>
}
{history.location.pathname !== "/" &&
        <NavLink to="/" onClick={toggleCreate} className=" nav-stamp stamp_logo" activeClassName="active">
        <div className="th-metal-light stamp-title">Home</div>
          <img className="lo-center logo" src={turtle} alt="Persistamp Logo: a red turtle stamp" />
        </NavLink>
}
        
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
        <NavLink to='/' className="nav-stamp nav-stamp_logo-link" activeClassName="active">
          <img className="nav-stamp_logo" src={turtle} alt="Persistamp Logo: a red turtle stamp" />
        </NavLink>
      </nav> */}
    </>)
  }
}
