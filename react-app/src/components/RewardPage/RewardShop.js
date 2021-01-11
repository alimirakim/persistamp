import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'

import RewardShopContext from '../../context/RewardShopContext'
import Rewards from './Rewards'
import RedeemedRewardsHistory from './RedeemedRewardsHistory'
import RewardForm from '../forms/RewardForm'
import { BackButton } from '../forms/FormInputs'


export default function RewardShop() {
  const { pid } = useParams()
  const { program, rewards, redeemed, dispatchSetAll } = useContext(RewardShopContext)
  const [openCreate, setOpenCreate] = useState(false)


  const toggleCreate = (e) => setOpenCreate(!openCreate)


  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/rewards/programs/${pid}`)
      const { program_data, rewards_data, redeemed_data } = await res.json()
      dispatchSetAll({ program: program_data, rewards: rewards_data, redeemed: redeemed_data })
      console.log("rewards data", rewards_data)
      console.log("redeemed data", redeemed_data)
      console.log("program", program_data)
      // const { rewards_data, redeemed_data } = await fetch(`/api/rewards/programs/${pid}/users/${user.id}`).then(res => res.json())
    })()
  }, [])

  if (!program || !rewards) return null
  // Add/remove points
  return (
    <main style={{ color: program.color }}>

      <BackButton path="/" color={program.color} />

      <div className="rsp">
        <h1 className="cam">
          <i className={`fas fa-${program.icon}`}></i> {program.title} Reward Shop
          </h1>

        <h2>Your Points: <span style={{ fontSize: "3rem" }}>{program.points} <i className={`fas fa-${program.icon}`}></i></span></h2>

        <button onClick={toggleCreate}>Add Reward</button>
        {openCreate &&
          <RewardForm open={openCreate} handleClose={toggleCreate} />
        }

        <div style={{ display: "flex", justifyContent: "space-around" }}>

          <Rewards />

          <RedeemedRewardsHistory redeemed={redeemed} />

        </div>
      </div>

    </main>
  )
}
