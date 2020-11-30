import React, { useEffect, useState, useContext, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import OptionsContext from '../context/OptionsContext'
import UserContext from '../context/UserContext'
import HabitBoardContext from '../context/HabitBoardContext'
import { AddName, AddDescription, ChooseColor, ChooseStamp, ChooseLimit, ChooseQuantity, ChooseCost, ActionOrCancelButtons } from './FormInputs'
import { setProgramRewards, createReward, deleteReward, setRedeemed, redeemReward, rewardsReducer, redeemedReducer } from '../context/reducers'


export default function RewardShop() {
  const { pid, mid } = useParams()
  const { programs } = useContext(HabitBoardContext)
  const { user } = useContext(UserContext)
  const membership = user.memberships[mid]
  const program = programs[pid]
  const [rewards, dispatchRewards] = useReducer(rewardsReducer)
  const [redeemed, dispatchRedeemed] = useReducer(redeemedReducer)
  const [points, setPoints] = useState(membership.points)
  console.log("rewards and redeemed...")

  useEffect(() => {
    if (!rewards) {
      (async () => {
        const res = await fetch(`/api/rewards/programs/${pid}`)
        dispatchRewards(setProgramRewards(await res.json()))
      })()
    }
  }, [])

  useEffect(() => {
    if (!redeemed) {
      (async () => {
        const res = await fetch(`/api/rewards/programs/${pid}/users/${user.id}/redeemed`)
        dispatchRedeemed(setRedeemed(await res.json()))
      })()
    }
  }, [redeemed])
  console.log("got rewards and redeemed", rewards, redeemed)
  if (!rewards || !redeemed) return null

  return (<article style={{ color: program.color.hex }}>
    <h1><i className={`fas fa-${program.stamp.stamp}`}></i> {program.program} Reward Shop</h1>
    <h2>Your Points: {points} <i className={`fas fa-${program.stamp.stamp}`}></i></h2>

    <RewardForm program={program} dispatchRewards={dispatchRewards} rewards={rewards} />
    <div style={{ display: "flex", justifyContent: "space-around" }}>

      <article>
        <h2>Redeem Rewards</h2>
        <ul style={{display: "flex", flexDirection: "column-reverse"}}>
          {Object.values(rewards).map(reward => (
            <li key={reward.id} style={{ color: reward.color.hex }}>
              <RewardDeleteForm reward={reward} dispatchRewards={dispatchRewards} />
              <RedeemForm redeemed={redeemed} reward={reward} mid={mid} setPoints={setPoints} dispatchRedeemed={dispatchRedeemed} />
            </li>))}
        </ul>
      </article>

      <article>
        <h2>Reward History</h2>
        <ul style={{display: "flex", flexDirection: "column-reverse"}}>
          {Object.values(redeemed).map(redeem => (
            <li key={redeem.id} style={{ color: redeem.reward.color.hex }}>
              <dl>
                <dt>Reward:</dt>
                <dd>{redeem.reward.reward}</dd>
                <dt>Description:</dt>
                <dd>{redeem.reward.description}</dd>
                <dt>Redeemed at:</dt>
                <dd>{new Date(redeem.redeemed_at).toLocaleString()}</dd>
                <dt>Cost:</dt>
                <dd>{redeem.reward.cost} <i className={`fas fa-${redeem.reward.stamp.stamp}`}></i></dd>
              </dl>
            </li>
          ))}
        </ul>
      </article>

    </div>

  </article>)
}


function RedeemForm({ redeemed, reward, mid, setPoints, dispatchRedeemed }) {
  const [open, setOpen] = useState(false)

  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)

  const onRedeem = async () => {
    setOpen(false)
    const res = await fetch(`/api/rewards/${reward.id}/members/${mid}/redeem`)
    const { redeemed_data, points } = await res.json()
    setPoints(points)
    dispatchRedeemed(redeemReward(redeemed_data))
    console.log("redeemed!", redeemed, redeemed_data)
  }

  return (<>
    <button onClick={handleOpen} style={{ color: reward.color.hex, backgroundColor: "rgba(250,250,250,0.1)", borderRadius: "1rem", borderWidth: 0, width: "100%" }}>
      <h3>{reward.reward}</h3>
      <dl>
        <dt>Limit:</dt>
        <dd>{reward.limit_per_member}</dd>
        <dt>Quantity:</dt>
        <dd>{reward.quantity}</dd>
        <dt>Cost:</dt>
        <dd>{reward.cost} <i className={`fas fa-${reward.stamp.stamp}`}></i></dd>
      </dl>
    </button>

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: reward.color.hex }}>Redeem Reward: "{reward.reward}"</DialogTitle>
      <DialogContent style={{ color: reward.color.hex }}>
        <blockquote>{reward.description}</blockquote>
        <dl>
          <dt>Limit per Member:</dt>
          <dd>{reward.limit_per_member}</dd>
          <dt>Quantity Remaining:</dt>
          <dd>{reward.quantity}</dd>
          <dt>Cost:</dt>
          <dd>{reward.cost} <i className={`fas fa-${reward.stamp.stamp}`}></i></dd>
        </dl>
        <ActionOrCancelButtons handleClose={handleClose} onAction={onRedeem} action={"Redeem"} />
      </DialogContent>
    </Dialog>


    {/* <Dialog open={openRedeemed} onClose={handleClose}>
      <DialogTitle style={{ color: reward.color.hex }}>Keep it up!</DialogTitle>
      <DialogContent style={{ color: reward.color.hex }}>
        <blockquote>{reward.description}</blockquote>
        You 
        <ActionOrCancelButtons handleClose={handleClose} onAction={onRedeem} action={"Redeem"} />
      </DialogContent>
    </Dialog> */}
  </>)
}



export function RewardForm({ program, dispatchRewards, rewards, }) {
  const { user } = useContext(UserContext)
  const { colors, stamps } = useContext(OptionsContext)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [color, setColor] = useState(1)
  const [stamp, setStamp] = useState(4)
  const [cost, setCost] = useState(7)
  const [limit, setLimit] = useState(-1)
  const [quantity, setQuantity] = useState(-1)

  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)

  const onCreate = async (e) => {
    e.preventDefault()
    setOpen(false)
    console.log("HELLO, CREATING?")
    const res = await fetch(`/api/rewards/programs/${program.id}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reward: name,
        description,
        color: parseInt(color),
        stamp: parseInt(stamp),
        cost,
        limit,
        quantity,
        userId: user.id,
      })
    })
    console.log("REWARD MADE?", res)
    const reward = await res.json()
    console.log("new reward!", reward)
    dispatchRewards(createReward(reward))
    console.log("rewards!", rewards)
    setName()
    setDescription()
    setColor(1)
    setStamp(4)
    setCost(7)
    setLimit(-1)
    setQuantity(-1)
  }

  return (
    <article>
      <button onClick={handleOpen}>+Reward</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a reward for "{program.program}"!</DialogTitle>
        <DialogContent>

          <AddName name={name} setName={setName} />
          <AddDescription description={description} setDescription={setDescription} />
          <ChooseColor colors={colors} color={color} setColor={setColor} />
          <ChooseStamp stamps={stamps} stamp={stamp} setStamp={setStamp} color={color} />
          <ChooseCost cost={cost} setCost={setCost} />
          <ChooseLimit limit={limit} setLimit={setLimit} />
          <ChooseQuantity quantity={quantity} setQuantity={setQuantity} />
          <ActionOrCancelButtons handleClose={handleClose} onAction={onCreate} action={"Create"} />
        </DialogContent>
      </Dialog>

    </article>
  )
}


export function RewardDeleteForm({ reward, dispatchRewards }) {
  const [open, setOpen] = useState(false)
  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)

  const onDelete = async (e) => {
    setOpen(false)
    dispatchRewards(deleteReward(reward))
    const res = await fetch(`/api/rewards/${reward.id}/delete`, {
      method: "DELETE",
    })
    const result = await res.json()
    console.log("deleted reward!", result)
  }

  return (
    <article>
      <button onClick={handleOpen} style={{ borderWidth: 0, backgroundColor: "rgba(0,0,0,0", color: "gray" }}><i className={`fas fa-trash`}></i></button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete reward "{reward.reward}" for "{reward.program}"?</DialogTitle>
        <DialogContent>
          <strong>Are you sure you want to PERMANENTLY delete this reward option for {reward.program.program}?</strong>
          <ActionOrCancelButtons handleClose={handleClose} onAction={onDelete} action={"Delete"} />
        </DialogContent>
      </Dialog>

    </article>
  )


}