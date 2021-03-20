import React, { useEffect, useState, useContext } from 'react'

import UserContext from '../../context/UserContext'
import OptionsContext from '../../context/OptionsContext'
import PrivatePage from '../PrivatePage'
import RewardShopContext from '../../context/RewardShopContext'
import Rewards from './Rewards'
import ReceiptRewardsHistory from './ReceiptRewardsHistory'
import RewardForm from '../forms/RewardForm'
import NavCard from '../nav/NavCard'


export default function RewardShop({ auth, setAuth }) {
  const { colors } = useContext(OptionsContext)
  const user = useContext(UserContext)
  const { receipts, dispatchSetAll } = useContext(RewardShopContext)
  const [openCreate, setOpenCreate] = useState(false)

  const toggleCreate = (e) => setOpenCreate(!openCreate)

  useEffect(() => {
    if (auth) {
      (async () => {
        const res = await fetch(`/api/rewards/user`)
        const { points_data, rewards_data, receipts_data } = await res.json()
        dispatchSetAll({ program: {}, points: points_data, rewards: rewards_data, receipts: receipts_data })
        // const { rewards_data, receipts_data } = await fetch(`/api/rewards/programs/${pid}/users/${user.id}`).then(res => res.json())
      })()
    }
  }, [])

  if (!auth) return <PrivatePage />

  // Add/remove points
  return (<>
    <NavCard auth={auth} setAuth={setAuth} />
    <div className="hbd-title">
    {/* <h2 className="persistamp">My Reward Shop */}
    <div className={`rsp-point-con ${user.points < 0 && "is-in-debt"}`}>
        <span className="rsp-point-label">My Points: </span>
        <span className="rsp-points">{user.points}</span>
      </div>
    {/* </h2> */}
    </div>
    <main className="" style={{ color: colors[user.cid].hex }}>
      <RewardForm open={openCreate} handleClose={toggleCreate} cid={user.cid} iid={user.iid} />
      <div className="rew-con">
        <ReceiptRewardsHistory receipts={receipts} />
        <Rewards />
      </div>
    </main>
  </>)
}
