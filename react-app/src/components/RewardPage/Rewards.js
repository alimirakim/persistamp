import React, { useContext } from 'react'
import RewardShopContext from '../../context/RewardShopContext'
import UserContext from '../../context/UserContext'
import RewardCard from './RewardCard'

export default function Rewards() {
  const { user } = useContext(UserContext)
  const { rewards, receipts, program } = useContext(RewardShopContext)

  if (Object.keys(rewards).length === 0) {
    return (
    <p className="msg-none lo-center">You have not added any rewards to the reward shop yet. You can add some by clicking the red trophy icon labeled 'Add' on your ID card. Find it in the top-right corner of your screen. Have fun! :)</p>
    )
  }
  
  return (
      <ul className="programBoards-container program-cards">
        {Array.from(Object.values(rewards).reverse()).map(reward => {
          const receiptCount = Object.values(receipts).filter(r => r.rew_id === reward.id).length
          return (
            <li key={reward.id}>
              <RewardCard
                reward={reward}
                user={user}
                program={program}
                receiptCount={receiptCount}
              />
            </li>
          )
        })}
      </ul>
  )
}