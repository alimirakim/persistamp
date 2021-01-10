import FormWrapper from "./FormWrapper"
import React, { useState,useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ChooseLimit, ChooseQuantity, ChooseCost } from '../forms/FormInputs'
import { createReward, } from '../../context/reducers'
import RewardShopContext from '../../context/RewardShopContext'


export default function RewardForm({open, handleClose}) {
  const {dispatchRewards} = useContext(RewardShopContext)
  const { pid } = useParams()
  const [cost, setCost] = useState(7)
  const [limit, setLimit] = useState(-1)
  const [quantity, setQuantity] = useState(-1)

  const uniqueInputs = () => (<>
    <ChooseCost cost={cost} setCost={setCost} />
    <ChooseLimit limit={limit} setLimit={setLimit} />
    <ChooseQuantity quantity={quantity} setQuantity={setQuantity} />
  </>)

  return (
    <FormWrapper
      type="reward"
      path={`/api/rewards/programs/${pid}/create`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchRewards}
      actionCreator={createReward}
      uniqueContent={cost, limit, quantity}
      uniqueInputs={uniqueInputs}

    />
  )
}

// export function RewardForm({ program, dispatchRewards, rewards, }) {
//   const { user } = useContext(UserContext)
//   const { colors, icons } = useContext(OptionsContext)
//   const [open, setOpen] = useState(false)
//   const [title, setTitle] = useState()
//   const [description, setDescription] = useState()
//   const [color, setColor] = useState(1)
//   const [icon, setIcon] = useState(4)
//   const [cost, setCost] = useState(7)
//   const [limit, setLimit] = useState(-1)
//   const [quantity, setQuantity] = useState(-1)
//   const [errors, setErrors] = useState([])

//   const handleOpen = (e) => setOpen(true)
//   const handleClose = (e) => setOpen(false)

//   const onCreate = async (e) => {
//     e.preventDefault()
//     setOpen(false)
//     console.log("HELLO, CREATING?")
//     const res = await fetch(`/api/rewards/programs/${program.id}/create`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         reward: title,
//         description,
//         color,
//         icon,
//         cost,
//         limit,
//         quantity,
//         userId: user.id,
//       })
//     })
//     console.log("REWARD MADE?", res)
//     if (res.ok) {
//       const reward = await res.json()
//       console.log("new reward!", reward)
//       dispatchRewards(createReward(reward))
//       console.log("rewards!", rewards)
//       setTitle()
//       setDescription()
//       setColor(1)
//       setIcon(4)
//       setCost(7)
//       setLimit(-1)
//       setQuantity(-1)
//     } else {
//       setErrors(res.errors)
//     }
//   }

//   return (
//     <article>

//       <button className=" make-btn" onClick={handleOpen} style={{ backgroundColor: "crimson", width: "100%", fontSize: "2rem" }}><i className="fas fa-plus-circle"></i> Reward</button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Create a reward for "{program.title}"!</DialogTitle>
//         <div>
//           {renderErrors(errors)}
//         </div>
//         <DialogContent>

//           <AddTitle title={title} setTitle={setTitle} />
//           <AddDescription description={description} setDescription={setDescription} />
//           <ChooseColor colors={colors} color={color} setColor={setColor} />
//           <ChooseIcon icons={icons} icon={icon} setIcon={setIcon} color={color} />
//           <ChooseCost cost={cost} setCost={setCost} />
//           <ChooseLimit limit={limit} setLimit={setLimit} />
//           <ChooseQuantity quantity={quantity} setQuantity={setQuantity} />
//           <ActionOrCancelButtons handleClose={handleClose} onAction={onCreate} action={"Create"} />
//         </DialogContent>
//       </Dialog>

//     </article>
//   )
// }
