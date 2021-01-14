import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'

import PrivatePage from '../PrivatePage'
import RewardShopContext from '../../context/RewardShopContext'
import Rewards from './Rewards'
import RedeemedRewardsHistory from './RedeemedRewardsHistory'
import RewardForm from '../forms/RewardForm'


export default function RewardShop({ auth }) {
  const { pid } = useParams()
  const { program, rewards, redeemed, dispatchSetAll } = useContext(RewardShopContext)
  const [openCreate, setOpenCreate] = useState(false)


  const toggleCreate = (e) => setOpenCreate(!openCreate)


  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/rewards/programs/${pid}`)
      const { program_data, rewards_data, redeemed_data } = await res.json()
      dispatchSetAll({ program: program_data, rewards: rewards_data, redeemed: redeemed_data })
      // const { rewards_data, redeemed_data } = await fetch(`/api/rewards/programs/${pid}/users/${user.id}`).then(res => res.json())
    })()
  }, [])

  if (!auth) <PrivatePage />

  if (!program || !rewards) return null
  // Add/remove points
  return (
    <main className="rewardShop-container" style={{ color: program.color }}>

      <div className="rsp">
        <h1 className="cam">
          <i className={`fas fa-${program.icon}`}></i> {program.title} Reward Shop
          </h1>

        <h2>Your Points: <span style={{ fontSize: "3rem" }}>{program.points} <i className={`fas fa-${program.icon}`}></i></span></h2>

        <button onClick={toggleCreate} style={{ color: "rgba(0,0,0,0.5)", backgroundColor: program.color, font: "bold uppercase 1.5rem Roboto", border: "none", borderRadius: "5px" }}>Add Reward</button>

        <RewardForm open={openCreate} handleClose={toggleCreate} />

        <div style={{ display: "flex", justifyContent: "space-around" }}>

          <Rewards />

          <RedeemedRewardsHistory redeemed={redeemed} />

        </div>
      </div>

    </main>
  )
}
