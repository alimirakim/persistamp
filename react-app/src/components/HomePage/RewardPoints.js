import React from "react";
import { Link } from 'react-router-dom'
import { RewardShopButton } from '../forms/FormInputs'


export default function RewardPoints({ program }) {
  const rewardShopPath = `/programs/${program.id}/memberships/${program.membership_id}/rewards`

  return (<>
    <div className="pbc-points">
      <section className="pbc-point-info">
        <h4 className="point-title">Reward Points</h4>
        <div className="point-box">
          {program.points}
        </div>
      </section>
      <RewardShopButton path={rewardShopPath} />
    </div>
  </>)
}