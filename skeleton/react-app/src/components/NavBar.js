import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../styles/layouts.css';
import UserContext from '../context/UserContext';
import LogoutIcon from './auth/LogoutButton';


const NavBar = ({ authenticated, setAuthenticated }) => {
  const user = useContext(UserContext);

  if (!authenticated) {
    return (
      <div className="NavBarArea">
      <nav>
        <div className="NavBarContainer">
          <div>
            <a href='/login' className="NavBarLogo">
              Persistamp (for now)
            </a>
          </div>
          <div>
            <NavLink to="/login" exact={true} className="NavBarItem" activeClassName="active">
              Login
            </NavLink>
          </div>
          <div>
            <NavLink to="/sign-up" exact={true} className="NavBarItem" activeClassName="active">
              Sign Up
            </NavLink>
          </div>
          <div>
            <NavLink to="/about" exact={true} className="NavBarItem" activeClassName="active">
              About
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
    )
  }
  return (
    <div className="NavBarArea">
      <nav>
        <div className="NavBarContainer">
          <div>
            <a href="/" className="NavBarLogo">
              Persistamp (for now)
            </a>
          </div>
          <div>
            <NavLink to="/users" exact={true} className="NavBarItem" activeClassName="active">
              Users
            </NavLink>
          </div>
          <NavLink to="/about" exact={true} className="NavBarItem" activeClassName="active">
            About
          </NavLink>
          <div>
            <LogoutIcon setAuthenticated={setAuthenticated} className="NavBarItem" />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
