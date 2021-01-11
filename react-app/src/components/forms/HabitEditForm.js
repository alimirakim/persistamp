import React, { useState, useContext } from 'react'
import FormWrapper from './FormWrapper'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import { editHabit } from '../../context/reducers'
import {ChooseFrequency} from './FormInputs'


  export default function HabitEditForm({ open, handleClose, habit }) {
    const { dispatchHabits } = useContext(ProgramBoardContext)
    const [frequency, setFrequency] = useState(habit.frequency)
    const updateFrequency = (e) => setFrequency(e.target.value)
  
    const uniqueInputs = () => (
      <ChooseFrequency frequency={frequency} updateFrequency={updateFrequency} />
    )
  
    return (
      <FormWrapper
        type="habit"
        path={`/api/habits/edit/${habit.id}`}
        open={open}
        handleClose={handleClose}
        dispatcher={dispatchHabits}
        actionCreator={editHabit}
        uniqueContent={frequency}
        uniqueInputs={uniqueInputs}
        edit={habit}
      />
    )
  }
  
// export default function HabitEditForm({ habit }) {

//   const { user } = useContext(UserContext)
//   const { dispatchHabits } = useContext(ProgramBoardContext)
//   const { colors, icons } = useContext(OptionsContext)

//   const [title, setTitle] = useState(habit.title)
//   const [description, setDescription] = useState(habit.description)
//   const [frequency, setFrequency] = useState(habit.frequency)
//   const [color, setColor] = useState(Object.values(colors).find(c => c.hex = habit.color).id)
//   const [icon, setIcon] = useState(Object.values(icons).find(i => i.title = habit.icon).id)
//   const [openIcons, setOpenIcons] = useState(false)

//   const handleClickOpen = () => setOpen(true)
//   const handleClose = () => setOpen(false)
//   const toggleIcons = () => setOpenIcons(!openIcons)


//   const onEdit = async (e) => {
//     e.preventDefault()
//     setOpen(false)
//     const res = await fetch(`/api/habits/edit/${habit.id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title,
//         description,
//         frequency,
//         color,
//         icon,
//         userId: user.id,
//       })
//     })
//     const editedHabit = await res.json()
//     dispatchHabits(actionCreator(editedHabit))
//   }

//   if (!colors || !icons || !icon) return null
//   console.log("icon", icons[icon])
//   return (
//     <div>
//       <button onClick={handleClickOpen} style={{ color: "gray", backgroundColor: "rgba(0,0,0,0)", borderWidth: "0" }}>
//         <i className={`fas fa-pencil-alt`}></i>
//       </button>

//       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">Edit "{habit.title}" habit details</DialogTitle>

//         <DialogContent>
//           <AddTitle title={title} setTitle={setTitle} />
//           <AddDescription description={description} setDescription={setDescription} />
//           <ChooseFrequency frequency={frequency} setFrequency={setFrequency} />
//           <ColorInput icon={icons[icon].title} colors={colors} value={color} setValue={setColor} toggleIcons={toggleIcons} />
//           <IconInput open={openIcons} color={colors[color].hex} icons={icons} value={icon} setValue={setIcon} />
//           <ActionOrCancelButtons handleClose={handleClose} onAction={onEdit} action={"Save"} />
//         </DialogContent>

//       </Dialog>
//     </div>
//   )
// }
