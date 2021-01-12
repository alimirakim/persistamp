import React, { useEffect } from "react";
import { Link } from 'react-router-dom'


export default function RewardPoints({ program }) {
  const rewardShopPath = `/programs/${program.id}/memberships/${program.membership_id}/rewards`

  return (<>
      <i className={`pbc-points-ico fas fa-5x fa-${program.icon}`}></i>
    <Link to={rewardShopPath}>
      <section className="pbc-points">
        <h4>Reward Points</h4>
        <div className="point-box">
          {program.points}
        </div>
      </section>
    </Link>
  </>)
}