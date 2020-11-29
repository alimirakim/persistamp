import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import OptionsContext from '../context/OptionsContext'
import { AddName, AddDescription, ChooseColor, ChooseStamp, ChooseLimit, ChooseQuantity, ChooseCost, ActionOrCancelButtons } from './FormInputs'
import UserContext from '../context/UserContext'


export default function RewardShop() {
  const {pid} = useParams()
  const [rewards, setRewards] = useState()
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    if (!rewards) {
      (async () => {
        const res = await fetch(`/api/programs/${pid}/rewards`)
        setRewards(await res.json())
      })()
    }
  }, [rewards])
  if (!rewards) return null
  
  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)
  
  const onRedeem = async () => {
    const res = await fetch(`/rewards/${reward.id}/redeem`)
    const reward = await res.json()
  }

  return (<>
    <RewardForm />

    {rewards.map(reward => (<>
      <button onClick={handleOpen}>
        {reward.reward}
        <small>Cost: {reward.cost} <i className={`fas fa-${reward.stamp.stamp}`}></i>s</small>
      </button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Redeem Reward: "{reward.reward}"?</DialogTitle>
        <DialogContent>
          <ActionOrCancelButtons onAction={onRedeem} action={"Redeem"} />
        </DialogContent>
      </Dialog>

    </>
    ))}
  </>)
}

export function RewardForm({program}) {
  const {user} = useContext(UserContext)
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
    const res = await fetch(`/api/programs/${program.id}/rewards/create`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        reward: name,
        description,
        color,
        stamp,
        cost,
        limit,
        quantity,
        userId: user.id,
        program: program.id,
      })
    })
    const reward = await res.json()
    console.log("new reward!", reward)
  }

  return (
    <article>
      <h1>Redeem Rewards</h1>

      <button onClick={handleOpen}>+Reward</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a reward for "{program}"!</DialogTitle>
        <DialogContent>

          <AddName name={name} setName={setName} />
          <AddDescription description={description} setDescription={setDescription} />
          <ChooseColor colors={colors} color={color} setColor={setColor} />
          <ChooseStamp stamps={stamps} stamp={stamp} setStamp={setStamp} color={color} />
          <ChooseCost cost={cost} setCost={setCost} />
          <ChooseLimit limit={limit} setLimit={setLimit} />
          <ChooseQuantity quantity={quantity} setQuantity={setQuantity} />
          <ActionOrCancelButtons onAction={onCreate} action={"Create"} />
        </DialogContent>
      </Dialog>

    </article>
  )
}


export function RewardDeleteForm({program, reward}) {
  const {user} = useContext(UserContext)
  const [open, setOpen] = useState(false)

  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)

  const onDelete = async (e) => {
    const res = await fetch(`/api/programs/${program.id}/rewards/${reward.id}/delete`, {
      method: "DELETE",
    })
    const reward = await res.json()
    console.log("deleted reward!", reward)
  }

  return (
    <article>
      <button onClick={handleOpen}><i className={`fas fa-trash`}></i></button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete reward "{reward.reward}" for "{program}"?</DialogTitle>
        <DialogContent>
          <strong>Are you sure you want to PERMANENTLY delete this reward option for {reward.program.program}?</strong>
          <ActionOrCancelButtons onAction={onDelete} action={"Delete"} />
        </DialogContent>
      </Dialog>

    </article>
  )
  
  
}