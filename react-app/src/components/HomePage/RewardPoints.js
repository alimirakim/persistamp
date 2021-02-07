import React from "react";
import { RewardShopButton } from '../forms/FormInputs'


export default function RewardPoints({ program, styles }) {
  const rewardShopPath = `/programs/${program.id}/memberships/${program.mid}/reward-shop`
  const isInDebt = program.points < 0 ? "is-in-debt" : ""
  
  return (<>
    <div className="pbc-points">
      <section className="pbc-point-info">
        <h4 className={`point-title ${styles}`}>Reward Points</h4>
        <div className={`point-box ${isInDebt}`}>
          {program.points}
        </div>
      </section>
      <RewardShopButton path={rewardShopPath} styles={styles} />
    </div>
  </>)
}