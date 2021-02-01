import React, { useContext } from 'react'
import RewardShopContext from '../../context/RewardShopContext'
import OptionsContext from '../../context/OptionsContext'
import Redeemed from './Redeemed'

export default function RedeemedRewardsHistory() {
  const { redeemed, rewards } = useContext(RewardShopContext)
  const { colors, icons } = useContext(OptionsContext)

  return (
    <article className="rrh th-shadow">
      <h2 className="rsp-title">
        History
      </h2>
      
      {Object.keys(redeemed).length === 0 &&
      <p className="rrr-msg">No rewards have been redeemed yet. Try adding some rewards to the shop with the red 'Add' button on your ID card (see top-left). When you redeem a reward with the points you earn, they'll appear here for posterity. Good luck, and have fun! :)</p>
      }
      <ul className="rsp-ul">
        {Object.values(redeemed).map(redeem => {
          return (
            <li key={redeem.id}>
              <Redeemed reward={rewards[redeem.rew_id]} redeem={redeem} icon={icons[redeem.iid].title} />
            </li>
          )
        })}
      </ul>
    </article>
  )
}