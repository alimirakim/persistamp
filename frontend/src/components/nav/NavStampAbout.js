import React from 'react';
import { NavLink } from 'react-router-dom';


export default function NavStampAbout() {

  return (
    <NavLink to="/about"
      className="nav-stamp stamp_about"
      activeClassName="active"
    >
      <div className="th-metal-light stamp-title">
        About
      </div>
      <i className="lo-center fas fa-2x fa-info-circle" />
    </NavLink>
  )
}