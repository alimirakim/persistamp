import React from "react";
import { Link } from 'react-router-dom'


export default function ProgramRewardShopButton({program, points, mid}) {

  return (

    <div className="reward-shop">
      <h4 className="cam">REWARD SHOP</h4>
      <Link to={`/programs/${program.id}/memberships/${mid}/rewards`}>
        <i className={`fas fa-store`} style={{ color: program.color.hex, fontSize: "2rem", margin: "0.5rem" }}></i>
      </Link>

      <div>
        <b style={{ marginRight: "0.5rem" }}>POINTS:</b>
        <span className="points">{points}
          <i className={`fas fa-${program.stamp.stamp}`}></i>
        </span>
      </div>
    </div>
  )
}