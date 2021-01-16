import React from 'react';


export default function NavStampHabit({ toggleEdit }) {

  return (
    <button onClick={toggleEdit}
      className=" nav-stamp stamp_program"
      activeClassName="active"
    >
      <div className="th-metal-light stamp-title">Edit</div>
      <i className="lo-center fas fa-2x fa-pencil-alt" />
    </button>
  )
}
