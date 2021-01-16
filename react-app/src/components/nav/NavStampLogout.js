import React from 'react';
import { useHistory } from 'react-router-dom';


export default function NavStampLogout({ setAuth }) {
  const history = useHistory();

  const onLogout = async (e) => {
    const res = await fetch("/api/auth/logout", {
      headers: { "Content-Type": "application/json" }
    });
    await res.json();
    setAuth(false)
    return history.push('/')
  }

  return (
    <button onClick={onLogout}
      className=" nav-stamp stamp_logout"
      activeClassName="active"
    >
      <div className="th-metal-light stamp-title">
        Logout
      </div>
      <i className="lo-center fas fa-2x fa-door-open" />
    </button>
  )
}