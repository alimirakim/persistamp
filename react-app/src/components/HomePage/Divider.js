import React from "react";


export default function Divider({ icon }) {

  return (
    <div className="pbc-hr lo-row-center">
      <div className="line left" />
      <div className="pbc-ico">
        <i className={`lo-center fas fa-xs fa-${icon}`} />
      </div>
      <div className="line right" />
    </div>
  )
}
