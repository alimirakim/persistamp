import React from 'react';


export default function NavStamps({ toggleSettings }) {

  return (
    <button onClick={toggleSettings}
      className=" nav-stamp stamp_settings"
      activeClassName="active"
    >
      <div className="th-metal-light stamp-title">Settings</div>
      <i className="lo-center fas fa-2x fa-id-card" />
    </button>
  )
}
