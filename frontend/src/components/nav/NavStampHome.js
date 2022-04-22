import React from 'react';
import { NavLink } from 'react-router-dom';
import turtle from '../../images/turtle-green.svg'

export default function NavStampHome() {
  return (
    <NavLink to="/"
      className=" nav-stamp stamp_logo"
      activeClassName="active"
    >

      <img className="lo-center logo"
        src={turtle}
        alt="Persistamp Logo: a red turtle stamp"
      />
      <div className="th-metal-light stamp-title">
        Home
      </div>
    </NavLink>
  )
}
