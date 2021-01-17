import React, { useContext } from 'react'
import RewardShopContext from '../../context/RewardShopContext'
import RewardCard from './RewardCard'

export default function Rewards() {
  const { rewards, redeemed, program } = useContext(RewardShopContext)

  return (
    <article>
      <div className="th-fade-screen">
        <h2 className="rsp-title th-metal">
          Redeem Rewards
      </h2>
      </div>
      <ul className="rsp-ul">
        {Object.values(rewards).map(reward => {
          const redeemCount = Object.values(redeemed).filter(r => r.rew_id === reward.id).length
          return (
            <li key={reward.id}>
              <RewardCard
                reward={reward}
                program={program}
                redeemCount={redeemCount}
              />
            </li>
          )
        })}
      </ul>
    </article>
  )
}