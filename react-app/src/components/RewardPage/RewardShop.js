import React, { useEffect, useState, useContext, useReducer } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'

import OptionsContext from '../../context/OptionsContext'
import UserContext from '../../context/UserContext'
import ProgramBoardContext from '../../context/ProgramBoardContext'

import {
  AddTitle, AddDescription, ChooseColor, ChooseIcon, ChooseLimit, ChooseQuantity, ChooseCost, ActionOrCancelButtons
} from '../forms/FormInputs'
import {
  setProgramRewards, createReward, editReward, deleteReward, setRedeemed, redeemReward, rewardsReducer, redeemedReducer
} from '../../context/reducers'


export default function RewardShop() {
  const { pid, mid } = useParams()
  const { user } = useContext(UserContext)
  const {programs} = useContext(ProgramBoardContext)
  console.log("context", programs)
  const program = programs[pid]
  const [rewards, dispatchRewards] = useReducer(rewardsReducer)
  const [redeemed, dispatchRedeemed] = useReducer(redeemedReducer)
  const [points, setPoints] = useState(program.points)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/rewards/programs/${pid}/users/${user.id}`)
      const stuff = await res.json()
      const { rewards_data, redeemed_data } = await fetch(`/api/rewards/programs/${pid}/users/${user.id}`).then(res => res.json())
      dispatchRewards(setProgramRewards(rewards_data))
      dispatchRedeemed(setRedeemed(redeemed_data))
    })()
  }, [])

  useEffect(() => {
    console.log("reward shop: program", program, "rewards", rewards, "redeemed", redeemed)
  }, [program, rewards, redeemed])

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

  if (!program || !rewards || !redeemed) return null

  return (<article style={{ color: program.color }}>
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
                <RedeemForm redeemed={redeemed} reward={reward} mid={mid} setPoints={setPoints} dispatchRedeemed={dispatchRedeemed} />
              </li>))}
          </ul>
        </article>

        <article>
          <h2 style={{ border: "10px double", padding: "0.5rem", borderRadius: "1rem" }}>Reward History</h2>
          <ul style={{ display: "flex", flexDirection: "column-reverse" }}>
            {Object.values(redeemed).map(redeem => (
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

  </article>)
}


function RedeemForm({ redeemed, reward, uid, setPoints, dispatchRedeemed }) {
  const [open, setOpen] = useState(false)

  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)

  const onRedeem = async () => {
    setOpen(false)
    const res = await fetch(`/api/rewards/${reward.id}/memberships/${uid}/redeem`)
    const { redeemed_data, points } = await res.json()
    setPoints(points)
    dispatchRedeemed(redeemReward(redeemed_data))
    console.log("redeemed!", redeemed, redeemed_data)
  }

  return (<>
    <button onClick={handleOpen} style={{ color: reward.color, backgroundColor: "rgba(250,250,250,0.1)", borderRadius: "1rem", borderWidth: 0, width: "100%" }}>
      <h3>{reward.reward}</h3>
      <blockquote>{reward.description}</blockquote>
      <dl>
        <dt>Limit:</dt>
        <dd>{reward.limit_per_member}</dd>
        <dt>Quantity:</dt>
        <dd>{reward.quantity}</dd>
        <dt>Cost:</dt>
        <dd>{reward.cost} <i className={`fas fa-${reward.icon}`}></i></dd>
      </dl>
    </button>

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ color: reward.color }}>Redeem Reward: "{reward.reward}"</DialogTitle>
      <DialogContent style={{ color: reward.color }}>
        <blockquote>{reward.description}</blockquote>
        <dl>
          <dt>Limit per Member:</dt>
          <dd>{reward.limit_per_member}</dd>
          <dt>Quantity Remaining:</dt>
          <dd>{reward.quantity}</dd>
          <dt>Cost:</dt>
          <dd>{reward.cost} <i className={`fas fa-${reward.icon}`}></i></dd>
        </dl>
        <ActionOrCancelButtons handleClose={handleClose} onAction={onRedeem} action={"Redeem"} />
      </DialogContent>
    </Dialog>


    {/* <Dialog open={openRedeemed} onClose={handleClose}>
      <DialogTitle style={{ color: reward.color }}>Keep it up!</DialogTitle>
      <DialogContent style={{ color: reward.color }}>
        <blockquote>{reward.description}</blockquote>
        You 
        <ActionOrCancelButtons handleClose={handleClose} onAction={onRedeem} action={"Redeem"} />
      </DialogContent>
    </Dialog> */}
  </>)
}



export function RewardForm({ program, dispatchRewards, rewards, }) {
  const { user } = useContext(UserContext)
  const { colors, icons } = useContext(OptionsContext)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [color, setColor] = useState(1)
  const [icon, setIcon] = useState(4)
  const [cost, setCost] = useState(7)
  const [limit, setLimit] = useState(-1)
  const [quantity, setQuantity] = useState(-1)
  const [errors, setErrors] = useState([])

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
        reward: title,
        description,
        color,
        icon,
        cost,
        limit,
        quantity,
        userId: user.id,
      })
    })
    console.log("REWARD MADE?", res)
    if (res.ok) {
      const reward = await res.json()
      console.log("new reward!", reward)
      dispatchRewards(createReward(reward))
      console.log("rewards!", rewards)
      setTitle()
      setDescription()
      setColor(1)
      setIcon(4)
      setCost(7)
      setLimit(-1)
      setQuantity(-1)
    } else {
      setErrors(res.errors)
    }
  }

  return (
    <article>

      <button className=" make-btn" onClick={handleOpen} style={{ backgroundColor: "crimson", width: "100%", fontSize: "2rem" }}><i className="fas fa-plus-circle"></i> Reward</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a reward for "{program.title}"!</DialogTitle>
        <div>
          {renderErrors(errors)}
        </div>
        <DialogContent>

          <AddTitle title={title} setTitle={setTitle} />
          <AddDescription description={description} setDescription={setDescription} />
          <ChooseColor colors={colors} color={color} setColor={setColor} />
          <ChooseIcon icons={icons} icon={icon} setIcon={setIcon} color={color} />
          <ChooseCost cost={cost} setCost={setCost} />
          <ChooseLimit limit={limit} setLimit={setLimit} />
          <ChooseQuantity quantity={quantity} setQuantity={setQuantity} />
          <ActionOrCancelButtons handleClose={handleClose} onAction={onCreate} action={"Create"} />
        </DialogContent>
      </Dialog>

    </article>
  )
}


export function RewardEditForm({ program, reward, dispatchRewards }) {
  const { colors, icons } = useContext(OptionsContext)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(reward.reward)
  const [description, setDescription] = useState(reward.description)
  const [color, setColor] = useState(reward.color.id)
  const [icon, setIcon] = useState(reward.icon.id)
  const [cost, setCost] = useState(reward.cost)
  const [limit, setLimit] = useState(reward.limit_per_member)
  const [quantity, setQuantity] = useState(reward.quantity)
  console.log("reward to edit!", title, description, color, icon, cost, limit, quantity)
  // console.log("reward to edit!", reward)

  // if (reward.quantity == "∞") setQuantity(-1) 
  // if (reward.limit_per_member == "∞") setLimit(-1)

  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)

  const onEdit = async (e) => {
    e.preventDefault()
    setOpen(false)
    if (typeof limit !== "number") setLimit(-1)
    if (typeof quantity !== "number") setQuantity(-1)
    const res = await fetch(`/api/rewards/${reward.id}/edit`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reward: title,
        description,
        color,
        icon,
        cost,
        limit,
        quantity,
      })
    })
    console.log("REWARD MADE?", res)
    const reward_data = await res.json()
    dispatchRewards(editReward(reward_data))
    console.log("new reward!", reward_data)
  }

  return (
    <article>
      <button onClick={handleOpen} style={{ borderWidth: 0, backgroundColor: "rgba(0,0,0,0", color: "white" }}>

        <i className={`fas fa-pencil-alt`}></i>


      </button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit reward "{reward.reward}" for "{program.title}"!</DialogTitle>
        <DialogContent>

          <AddTitle title={title} setTitle={setTitle} />
          <AddDescription description={description} setDescription={setDescription} />
          <ChooseColor colors={colors} color={color} setColor={setColor} />
          <ChooseIcon icons={icons} icon={icon} setIcon={setIcon} color={color} />
          <ChooseCost cost={cost} setCost={setCost} />
          <ChooseLimit limit={limit} setLimit={setLimit} />
          <ChooseQuantity quantity={quantity} setQuantity={setQuantity} />
          <ActionOrCancelButtons handleClose={handleClose} onAction={onEdit} action={"Save"} />
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
  }

  return (
    <article>

      <button onClick={handleOpen} style={{ borderWidth: 0, backgroundColor: "rgba(0,0,0,0", color: "white" }}><i className={`fas fa-eraser`}></i></button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete reward "{reward.reward}" for "{reward.program}"?</DialogTitle>
        <DialogContent>
          <strong>Are you sure you want to PERMANENTLY delete this reward option for {reward.program.title}?</strong>
          <ActionOrCancelButtons handleClose={handleClose} onAction={onDelete} action={"Delete"} />
        </DialogContent>
      </Dialog>

    </article>
  )


}

const renderErrors = (errors) => {
  if (errors) {
    return errors.map(error => {
      console.log(error)
      return <div className='material-error'>{error}</div>
    })
  }
}