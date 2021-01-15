import React, { useContext } from 'react'
import RewardShopContext from '../../context/RewardShopContext'
import OptionsContext from '../../context/OptionsContext'
import Redeemed from './Redeemed'

export default function RedeemedRewardsHistory() {
  const { redeemed, rewards } = useContext(RewardShopContext)
  const {colors, icons} = useContext(OptionsContext)
  
  return (
    <article>
      <h2 className="rsp-title">Reward History</h2>
      <ul className="rsp-ul">
        {Object.values(redeemed).map(redeem => {
          return (
            <li key={redeem.id} style={{ color: colors[rewards[redeem.rew_id].cid].hex }}>
              <Redeemed reward={rewards[redeem.rew_id]} redeem={redeem} />
            </li>
          )
        })}
      </ul>
    </article>
  )
}