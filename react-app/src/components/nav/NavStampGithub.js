import React from 'react';


export default function NavStampMessages({toggleMessage}) {

  return (
    <a href="https://github.com/alimirakim/persistamp"
      className="nav-stamp stamp_program"
      activeClassName="active"
      target="_blank"
    >
      <div className="th-metal-light stamp-title">
      GitHub
      </div>
      <i className="lo-center fab fa-2x fa-github" />
    </a>
  )
}