import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'

import OptionsContext from '../../context/OptionsContext'
import PrivatePage from '../PrivatePage'
import RewardShopContext from '../../context/RewardShopContext'
import Rewards from './Rewards'
import RedeemedRewardsHistory from './RedeemedRewardsHistory'
import RewardForm from '../forms/RewardForm'
import NavCard from '../nav/NavCard'


export default function RewardShop({ auth, setAuth }) {
  const { pid } = useParams()
  const { colors } = useContext(OptionsContext)
  const { program, rewards, redeemed, dispatchSetAll } = useContext(RewardShopContext)
  const [openCreate, setOpenCreate] = useState(false)

  const toggleCreate = (e) => setOpenCreate(!openCreate)

  useEffect(() => {
    if (auth) {
      (async () => {
        const res = await fetch(`/api/rewards/programs/${pid}`)
        const { program_data, rewards_data, redeemed_data } = await res.json()
        dispatchSetAll({ program: program_data, rewards: rewards_data, redeemed: redeemed_data })
        // const { rewards_data, redeemed_data } = await fetch(`/api/rewards/programs/${pid}/users/${user.id}`).then(res => res.json())
      })()
    }
  }, [])

  if (!auth) return <PrivatePage />
  if (!program.title || !rewards) return null

  // Add/remove points
  return (<>
    <NavCard auth={auth} setAuth={setAuth} program={program} />
    <div className="hbd-title">
    <h2 className="persistamp">Reward Shop
    <div className={`rsp-point-con ${program.points < 0 && "is-in-debt"}`}>
        <span className="rsp-point-label">My Points: </span>
        <span className="rsp-points">{program.points}</span>
      </div>
    </h2>
    </div>
    <main className="" style={{ color: colors[program.cid].hex }}>
      <RewardForm open={openCreate} handleClose={toggleCreate} cid={program.cid} iid={program.iid} />
      <div className="rew-con">
        <RedeemedRewardsHistory redeemed={redeemed} />
        <Rewards />
      </div>
    </main>
  </>)
}
