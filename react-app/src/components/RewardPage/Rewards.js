import React, { useState, useContext } from 'react'
import RewardShopContext from '../../context/RewardShopContext'
import RewardCard from './RewardCard'

export default function Rewards() {
  const { rewards, program } = useContext(RewardShopContext)

  if (!rewards || !program) return null

  return (
    <article>
      <h2 className="rsp-title">Redeem Rewards</h2>
      <ul className="rsp-ul">
        {Object.values(rewards).map(reward => (
          <li key={reward.id} style={{ color: "black" }}>
            <RewardCard reward={reward} program={program} />
          </li>
        ))}
      </ul>
    </article>
  )
}