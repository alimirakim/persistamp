import React, { useEffect, useState, useContext, useReducer } from 'react'
import { Link, useParams } from 'react-router-dom'

import UserContext from '../../context/UserContext'
import RewardShopContext from '../../context/RewardShopContext'
import RewardForm from '../forms/RewardForm'
import RewardEditForm from '../forms/RewardEditForm'
import RewardDeleteForm from '../forms/RewardDeleteForm'
import RedeemForm from '../forms/RedeemForm'

import rewardsReducer, { setProgramRewards, setRedeemed } from '../../reducers/rewardsReducer'


export default function RewardShop() {
  const { pid, mid } = useParams()
  const { user } = useContext(UserContext)
  const [rewards, dispatchRewards] = useReducer(rewardsReducer)
  const [points, setPoints] = useState(0)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/rewards/programs/${pid}/users/${user.id}`)
      const stuff = await res.json()
      const { rewards_data, redeemed_data } = await fetch(`/api/rewards/programs/${pid}/users/${user.id}`).then(res => res.json())
      dispatchRewards(setProgramRewards(rewards_data))
    })()
  }, [])

  useEffect(() => console.log("reward shop: program"), [program])
  useEffect(() => console.log("rewards", rewards), [rewards])
  // useEffect(() => console.log("redeemed", redeemed), [redeemed])

  useEffect(() => {
    if (!rewards) {
      (async () => {
        const res = await fetch(`/api/rewards/programs/${pid}/rewards`)
        dispatchRewards(setProgramRewards(await res.json()))
      })()
    }
  }, [rewards])

  // useEffect(() => {
  //   if (!redeemed) {
  //     (async () => {
  //       const res = await fetch(`/api/rewards/programs/${pid}/users/${user.id}/redeemed`)
  //       dispatchRedeemed(setRedeemed(await res.json()))
  //     })()
  //   }
  // }, [redeemed])

  if (!program || !rewards) return null

  return (
    <RewardShopContext.Provider rewards={rewards} redeemed={rewards.redeemed} points={points} >

      <article style={{ color: program.color }}>
        <Link to={`/`}>
          <i className={`fas fa-chevron-circle-left`} style={{ color: program.color }}></i>
        </Link>

        <div style={{ display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center" }}>
          <h1 className="cam" style={{ fontSize: "3rem", margin: "2rem" }}><i className={`fas fa-${program.icon}`}></i> {program.title} Reward Shop</h1>
          <h2>Your Points: <span style={{ fontSize: "3rem" }}>{points} <i className={`fas fa-${program.icon}`}></i></span></h2>

          <RewardForm program={program} dispatchRewards={dispatchRewards} rewards={rewards} />
          <div style={{ display: "flex", justifyContent: "space-around" }}>

            <article>
              <h2 style={{ border: "10px double", padding: "0.5rem", borderRadius: "1rem" }}>Redeem Rewards</h2>
              <ul style={{ display: "flex", flexDirection: "column-reverse" }}>
                {Object.values(rewards).map(reward => (
                  <li key={reward.id} style={{ color: reward.color }}>
                    <RewardEditForm program={program} reward={reward} dispatchRewards={dispatchRewards} />
                    <RewardDeleteForm reward={reward} dispatchRewards={dispatchRewards} />
                    {/* <RedeemForm redeemed={redeemed} reward={reward} mid={mid} setPoints={setPoints} dispatchRedeemed={dispatchRedeemed} /> */}
                  </li>))}
              </ul>
            </article>

            <article>
              <h2 style={{ border: "10px double", padding: "0.5rem", borderRadius: "1rem" }}>Reward History</h2>
              <ul style={{ display: "flex", flexDirection: "column-reverse" }}>
                {Object.values(rewards.redeemed).map(redeem => (
                  <li key={redeem.id} style={{ color: redeem.reward.color }}>
                    <dl>
                      <dt>Reward:</dt>
                      <dd>{redeem.reward.reward}</dd>
                      <dt>Description:</dt>
                      <dd>{redeem.reward.description}</dd>
                      <dt>Redeemed at:</dt>
                      <dd>{new Date(redeem.redeemed_at).toLocaleString()}</dd>
                      <dt>Cost:</dt>
                      <dd>{redeem.reward.cost} <i className={`fas fa-${redeem.reward.icon}`}></i></dd>
                    </dl>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>

      </article>
    </RewardShopContext.Provider>
  )
}


// function RedeemForm({ redeemed, reward, uid, setPoints, dispatchRedeemed }) {
//   const [open, setOpen] = useState(false)

//   const handleOpen = (e) => setOpen(true)
//   const handleClose = (e) => setOpen(false)

//   const onRedeem = async () => {
//     setOpen(false)
//     const res = await fetch(`/api/rewards/${reward.id}/memberships/${uid}/redeem`)
//     const { redeemed_data, points } = await res.json()
//     setPoints(points)
//     dispatchRedeemed(redeemReward(redeemed_data))
//     console.log("redeemed!", redeemed, redeemed_data)
//   }

//   return (<>
//     <button onClick={handleOpen} style={{ color: reward.color, backgroundColor: "rgba(250,250,250,0.1)", borderRadius: "1rem", borderWidth: 0, width: "100%" }}>
//       <h3>{reward.reward}</h3>
//       <blockquote>{reward.description}</blockquote>
//       <dl>
//         <dt>Limit:</dt>
//         <dd>{reward.limit_per_member}</dd>
//         <dt>Quantity:</dt>
//         <dd>{reward.quantity}</dd>
//         <dt>Cost:</dt>
//         <dd>{reward.cost} <i className={`fas fa-${reward.icon}`}></i></dd>
//       </dl>
//     </button>

//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle style={{ color: reward.color }}>Redeem Reward: "{reward.reward}"</DialogTitle>
//       <DialogContent style={{ color: reward.color }}>
//         <blockquote>{reward.description}</blockquote>
//         <dl>
//           <dt>Limit per Member:</dt>
//           <dd>{reward.limit_per_member}</dd>
//           <dt>Quantity Remaining:</dt>
//           <dd>{reward.quantity}</dd>
//           <dt>Cost:</dt>
//           <dd>{reward.cost} <i className={`fas fa-${reward.icon}`}></i></dd>
//         </dl>
//         <ActionOrCancelButtons handleClose={handleClose} onAction={onRedeem} action={"Redeem"} />
//       </DialogContent>
//     </Dialog>

{/* <Dialog open={openRedeemed} onClose={handleClose}>
      <DialogTitle style={{ color: reward.color }}>Keep it up!</DialogTitle>
      <DialogContent style={{ color: reward.color }}>
        <blockquote>{reward.description}</blockquote>
        You 
        <ActionOrCancelButtons handleClose={handleClose} onAction={onRedeem} action={"Redeem"} />
      </DialogContent>
    </Dialog> */}
//   </>)
// }
