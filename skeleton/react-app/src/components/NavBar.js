import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../styles/layouts.css';
import UserContext from '../context/UserContext';



const NavBar = ({ authenticated, setAuthenticated }) => {
  const user = useContext(UserContext);

  if (!authenticated) {
    return (
      <div className="NavBarArea">
      <nav>
        <div className="NavBarContainer">
          <div>
            <NavLink to="/login" exact={true} activeClassName="active">
              Persistamp (for now)
            </NavLink>
          </div>
          <div>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </div>
          <div>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
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
            <NavLink to="/" exact={true} activeClassName="active">
              Persistamp (for now)
            </NavLink>
          </div>
          <div>
            <NavLink to="/users" exact={true} activeClassName="active">
              Users
            </NavLink>
          </div>
          <div>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
