import React, { useEffect, useState, useContext } from 'react'

import UserContext from '../../context/UserContext'
import OptionsContext from '../../context/OptionsContext'
import PrivatePage from '../PrivatePage'
import RewardShopContext from '../../context/RewardShopContext'
import Rewards from './Rewards'
import ReceiptRewardsHistory from './ReceiptRewardsHistory'
import RewardForm from '../forms/RewardForm'
import NavCard from '../nav/NavCard'


export default function MainRewardShop({ auth, setAuth }) {
  const { colors } = useContext(OptionsContext)
  const user = useContext(UserContext)
  const { points } = useContext(RewardShopContext)
  const { receipts, dispatchSetAll } = useContext(RewardShopContext)
  const [openCreate, setOpenCreate] = useState(false)

  const toggleCreate = (e) => setOpenCreate(!openCreate)

  useEffect(() => {
    if (auth) {
      (async () => {
        const res = await fetch(`/api/rewards/user`)
        const { points_data, rewards_data, receipts_data } = await res.json()
        dispatchSetAll({ program: {}, points: points_data, rewards: rewards_data, receipts: receipts_data })
      })()
    }
  }, [])

  if (!auth) return <PrivatePage />

  // Add/remove points
  return (<>
    <header>
      <NavCard auth={auth} setAuth={setAuth} />

      <h1 className="th-h1 persistamp">My Reward Shop</h1>
      <button
        className="th-big-btn th-action"
        onClick={toggleCreate}
        style={{ backgroundColor: colors[user.cid].hex }}
      >Create Reward
      </button>
      <h2 className="persistamp-subtitle">
        <div className={`rsp-point-con ${points < 0 && "is-in-debt"}`}>
          <span className="rsp-point-label">My Points: </span>
          <span className="rsp-points">{points}</span>
        </div>
      </h2>
    </header>
    <main className="" style={{ color: colors[user.cid].hex }}>


      <RewardForm open={openCreate} handleClose={toggleCreate} cid={user.cid} iid={user.iid} />

      <div className="rew-con">
        <ReceiptRewardsHistory receipts={receipts} />
        <Rewards />
      </div>

    </main>
  </>)
}
