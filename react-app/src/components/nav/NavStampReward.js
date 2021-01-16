import React from 'react';


export default function NavStampReward({ toggleCreate }) {

  return (
    <button onClick={toggleCreate}
      className=" nav-stamp stamp_program"
      activeClassName="active"
    >
      <div className="th-metal-light stamp-title">Add</div>
      <i className="lo-center fas fa-2x fa-trophy" />
    </button>
  )
}
