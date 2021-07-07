import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'

import OptionsContext from '../../context/OptionsContext'
import PrivatePage from '../PrivatePage'
import RewardShopContext from '../../context/RewardShopContext'
import Rewards from './Rewards'
import ReceiptRewardsHistory from './ReceiptRewardsHistory'
import RewardForm from '../forms/RewardForm'
import NavCard from '../nav/NavCard'


export default function RewardShop({ auth, setAuth }) {
  const { pid } = useParams()
  const { colors } = useContext(OptionsContext)
  const { program, receipts, dispatchSetAll } = useContext(RewardShopContext)
  const [openCreate, setOpenCreate] = useState(false)

  const toggleCreate = (e) => setOpenCreate(!openCreate)

  useEffect(() => {
    if (auth) {
      (async () => {
        const res = await fetch(`/api/rewards/programs/${pid}`)
        const { program_data, rewards_data, receipts_data } = await res.json()
        dispatchSetAll({ program: program_data, rewards: rewards_data, receipts: receipts_data })
        // const { rewards_data, receipts_data } = await fetch(`/api/rewards/programs/${pid}/users/${user.id}`).then(res => res.json())
      })()
    }
  }, [])

  if (!auth) return <PrivatePage />
  if (!program.title) return null

  // Add/remove points
  return (<>
      <div className="header-container">
      <Link to="/"><h2 className="persistamp">Persistamp</h2></Link>
        <NavCard auth={auth} setAuth={setAuth} program={program} />
        <div className="hbd-title">

          <div className={`persistamp rsp-point-con ${program.points < 0 && "is-in-debt"}`}>
            <div className="rsp-point-label">Reward Points: </div>
            <div className="rsp-points">{program.points}</div>
          </div>
      </div>
    </div>

    <main className="" style={{ color: colors[program.cid].hex }}>
      <RewardForm open={openCreate} handleClose={toggleCreate} cid={program.cid} iid={program.iid} />
      <div className="rew-con">
        <ReceiptRewardsHistory receipts={receipts} />
        <Rewards />
      </div>
    </main>
  </>)
}
