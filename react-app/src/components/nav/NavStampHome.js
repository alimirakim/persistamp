import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import turtle from '../../images/turtle-green.svg'
import redTurtle from '../../images/turtle.svg'

export default function NavStampHome() {
  return (
    <NavLink to="/"
      className=" nav-stamp stamp_logo"
      activeClassName="active"
    >
          {/* <img style={{size: "0.5rem 0.5rem", transform: "rotate(40deg)"}}
        src={redTurtle}
        alt="Persistamp Logo: a red turtle stamp"
      /> */}
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
