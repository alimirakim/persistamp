import React from "react";
import { RewardShopButton } from '../forms/FormInputs'


export default function RewardPoints({ program }) {
  const rewardShopPath = `/programs/${program.id}/memberships/${program.mid}/rewards`
  const isInDebt = program.points < 0 ? "is-in-debt" : ""
  
  return (<>
    <div className="pbc-points">
      <section className="pbc-point-info">
        <h4 className="point-title">Reward Points</h4>
        <div className={`point-box ${isInDebt}`}>
          {program.points}
        </div>
      </section>
      <RewardShopButton path={rewardShopPath} />
    </div>
  </>)
}