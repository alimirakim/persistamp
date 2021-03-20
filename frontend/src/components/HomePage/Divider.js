import React from "react";


export default function Divider({ icon, line }) {

  return (
    <div className="pbc-hr lo-row-center">
      <div className={`line left ${line}`} />
      <div className="pbc-ico">
        <i className={`lo-center fas fa-xs fa-${icon}`} />
      </div>
      <div className={`line right ${line}`} />
    </div>
  )
}
