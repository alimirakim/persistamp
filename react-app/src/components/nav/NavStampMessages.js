import React from 'react';


export default function NavStampMessages({toggleMessage}) {

  return (<>
    <button onClick={toggleMessage}
      className=" nav-stamp stamp_messages"
      activeClassName="active"
    >
      <div className="th-metal-light stamp-title">Messages</div>
      <i className="lo-center fas fa-2x fa-envelope" />
    </button>
  </>)
}