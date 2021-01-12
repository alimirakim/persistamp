import React, { useEffect } from "react";
import { Link } from 'react-router-dom'


export default function RewardShopButton({ program }) {
 
  return (
    <Link to={`/programs/${program.id}/memberships/${program.membership_id}/rewards`}>
      <div className="rsb" style={{ backgroundColor: program.color, color: "black"}} >
        <h4 className="cam">REWARD SHOP</h4>
        <i className={`fas fa-store`} style={{fontSize: "2rem", margin: "0.5rem" }}></i>

        <div>
          <b style={{ marginRight: "0.5rem" }}>POINTS:</b>
          <span className="points">{program.points}
            <i className={`fas fa-${program.stamp}`}></i>
          </span>
        </div>
      </div>
    </Link>
  )
}