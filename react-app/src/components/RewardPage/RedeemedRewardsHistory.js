import React, { useContext } from 'react'
import RewardShopContext from '../../context/RewardShopContext'
import Redeemed from './Redeemed'

export default function RedeemedRewardsHistory() {
  const { redeemed, rewards } = useContext(RewardShopContext)
  
  return (
    <article>
      <h2 className="rsp-title">Reward History</h2>
      <ul className="rsp-ul">
        {Object.values(redeemed).map(redeem => {
          return (
            <li key={redeem.id} style={{ color: rewards[redeem.reward_id].color }}>
              <Redeemed reward={rewards[redeem.reward_id]} redeem={redeem} />
            </li>
          )
        })}
      </ul>
    </article>
  )
}