import React from 'react';
import {NavLink} from 'react-router-dom'
  

export default function NavStampRewardShop() {

  return (<>
    <NavLink
      to="/reward-shop"
      className=" nav-stamp stamp_messages"
      activeClassName="active"
    >
      <div className="th-metal-light stamp-title">Shop</div>
      <i className="lo-center fas fa-2x fa-store" />
    </NavLink>
  </>)
}