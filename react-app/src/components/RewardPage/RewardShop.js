import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'

import OptionsContext from '../../context/OptionsContext'
import PrivatePage from '../PrivatePage'
import RewardShopContext from '../../context/RewardShopContext'
import Rewards from './Rewards'
import RedeemedRewardsHistory from './RedeemedRewardsHistory'
import RewardForm from '../forms/RewardForm'


export default function RewardShop({ auth }) {
  const { pid } = useParams()
  const {colors, icons} = useContext(OptionsContext)
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

  if (!program.title || !rewards) return null
  console.log("reward program", program)
  
  // Add/remove points
  return (
    <main className="rewardShop-container" style={{ color: colors[program.cid].hex }}>

      <div className="rsp">
        <h1 className="cam">
          <i className={`fas fa-${icons[program.iid].title}`}></i> {program.title} Reward Shop
          </h1>

        <h2>Your Points: <span style={{ fontSize: "3rem" }}>{program.points} <i className={`fas fa-${icons[program.iid].title}`}></i></span></h2>

        <button onClick={toggleCreate} style={{ color: "rgba(0,0,0,0.5)", backgroundColor: colors[program.cid].hex, font: "bold uppercase 1.5rem Roboto", border: "none", borderRadius: "5px" }}>Add Reward</button>

        <RewardForm open={openCreate} handleClose={toggleCreate} cid={program.cid} iid={program.iid} />

        <div style={{ display: "flex", justifyContent: "space-around" }}>

          <Rewards />

          <RedeemedRewardsHistory redeemed={redeemed} />

        </div>
      </div>

    </main>
  )
}
