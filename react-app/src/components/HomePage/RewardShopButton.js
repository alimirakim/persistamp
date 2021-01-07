import React from "react";
import { Link } from 'react-router-dom'


export default function RewardShopButton({ program, points, mid }) {

  return (
    <Link to={`/programs/${program.id}/memberships/${mid}/rewards`}>
      <div className="reward-shop">
        <h4 className="cam">REWARD SHOP</h4>
        <i className={`fas fa-store`} style={{ color: program.color, fontSize: "2rem", margin: "0.5rem" }}></i>

        <div>
          <b style={{ marginRight: "0.5rem" }}>POINTS:</b>
          <span className="points">{points}
            <i className={`fas fa-${program.stamp}`}></i>
          </span>
        </div>
      </div>
    </Link>
  )
}