import React, { useContext } from 'react'
import { deleteReward} from '../../context/reducers'
import DeleteForm from '../forms/DeleteForm'
import RewardShopContext from '../../context/RewardShopContext'

export default function RewardDeleteForm({ open, handleClose, reward }) {
const { dispatchRewards } = useContext(RewardShopContext)
  
  return (
    <DeleteForm
      itemType="reward"
      path={`/api/rewards/${reward.id}/delete`}
      open={open}
      handleClose={handleClose}
      item={reward}
      dispatcher={dispatchRewards}
      actionCreator={deleteReward}
    />
  )
}


// export default function RewardDeleteForm({ reward, dispatchRewards }) {
//   const [open, setOpen] = useState(false)
//   const handleOpen = (e) => setOpen(true)
//   const handleClose = (e) => setOpen(false)

//   const onDelete = async (e) => {
//     setOpen(false)
//     dispatchRewards(deleteReward(reward))
//     const res = await fetch(`/api/rewards/${reward.id}/delete`, {
//       method: "DELETE",
//     })
//   }

//   return (
//     <article>

//       <button onClick={handleOpen} style={{ borderWidth: 0, backgroundColor: "rgba(0,0,0,0", color: "white" }}><i className={`fas fa-eraser`}></i></button>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Delete reward "{reward.reward}" for "{reward.program}"?</DialogTitle>
//         <DialogContent>
//           <strong>Are you sure you want to PERMANENTLY delete this reward option for {reward.program.title}?</strong>
//           <ActionOrCancelButtons handleClose={handleClose} onAction={onDelete} action={"Delete"} />
//         </DialogContent>
//       </Dialog>

//     </article>
//   )
// }
