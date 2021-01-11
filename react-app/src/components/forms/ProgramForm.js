import React, { useState, useContext } from 'react'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import UserContext from '../../context/UserContext'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import OptionsContext from '../../context/OptionsContext'
import { createProgram, editProgram, deleteProgram } from '../../context/reducers'
import { ActionOrCancelButtons, AddTitle, AddDescription, ChooseColor, ChooseIcon } from './FormInputs'
import FormWrapper from './FormWrapper'



export default function ProgramForm({ open, handleClose }) {
  const { dispatchPrograms } = useContext(ProgramBoardContext)

  const uniqueInputs = () => (<></>)

  return (
    <FormWrapper
      type="program"
      path={`/api/programs/create`}
      open={open}
      handleClose={handleClose}
      dispatcher={dispatchPrograms}
      actionCreator={createProgram}
      // uniqueContent={}
      uniqueInputs={uniqueInputs}
    />
  )
}


// export default function ProgramForm() {
//   const { user, setUser } = useContext(UserContext)
//   const { colors, icons } = useContext(OptionsContext)
//   const { dispatchPrograms } = useContext(ProgramBoardContext)

//   const [open, setOpen] = useState(false)
//   const [title, setTitle] = useState()
//   const [errors, setErrors] = useState([])
//   const [description, setDescription] = useState()
//   const [color, setColor] = useState(1)
//   const [icon, setIcon] = useState(2)

//   const handleOpen = (e) => setOpen(true)
//   const handleClose = (e) => setOpen(false)

//   const onCreate = async (e) => {
//     e.preventDefault()
//     setOpen(false)
//     const res = await fetch(`/api/programs/create`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         program: title,
//         description,
//         color,
//         icon,
//         userId: user.id
//       })
//     })
//     if(res.ok){
//       // User is updated to include new membership
//       const {program, updated_user} = await res.json()
//       setUser(updated_user)
//       dispatchPrograms(createProgram(program))

//       setTitle()
//       setDescription()
//       setColor(1)
//       setIcon(2)
//     }else{
//       setErrors(res.errors)
//     }
//   }
//   if (!colors || !icons) return null

//   return (<>
//     <button className="make-btn make-btn-big" onClick={handleOpen} style={{backgroundColor: "crimson"}}>
//     <i className="fas fa-plus-circle"></i>  Program</button>

//     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//       <DialogTitle id="form-dialog-title">Create a new Program!</DialogTitle>

//       <DialogContent>
//         <AddTitle title={title} setTitle={setTitle} />
//         <AddDescription description={description} setDescription={setDescription} />
//         <ChooseColor colors={colors} color={color} setColor={setColor} />
//         <ChooseIcon icons={icons} icon={icon} setIcon={setIcon} color={color} />
//         <ActionOrCancelButtons handleClose={handleClose} onAction={onCreate} action={"Create"} />

//       </DialogContent>
//     </Dialog>
//   </>)
// }


// export function ProgramEditForm({ program }) {
//   const { colors, icons } = useContext(OptionsContext)
//   const { dispatchPrograms } = useContext(ProgramBoardContext)

//   const [errors, setErrors] = useState([])
//   const [open, setOpen] = useState(false)
//   const [title, setTitle] = useState(program.title)
//   const [description, setDescription] = useState(program.description)
//   const [color, setColor] = useState(program.color.id)
//   const [icon, setIcon] = useState(program.icon.id)

//   const handleOpen = (e) => setOpen(true)
//   const handleClose = (e) => setOpen(false)

//   const onEdit = async (e) => {
//     e.preventDefault()
//     setOpen(false)
//     const res = await fetch(`/api/programs/edit/${program.id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         program: title,
//         description,
//         color,
//         icon,
//       })
//     })
//     if(res.ok){
//       const editedProgram = await res.json()
//       dispatchPrograms(editProgram(editedProgram))
//     }else{
//       setErrors(res.errors)
//     }
//   }

//   const renderErrors = (errors) => {
//     if (errors) {
//       return errors.map(error => {
//         return <div className='material-error'>{error}</div>
//       })
//     }
//   }

//   if (!colors || !icons) return null

//   return (<>
//     <button onClick={handleOpen} style={{color: "gray", backgroundColor: "rgba(0,0,0,0)", borderWidth: "0"}}>
//       <i className={`fas fa-pencil-alt`}></i>
//     </button>
//     <div>
//       {renderErrors(errors)}
//     </div>
//     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//       <DialogTitle id="form-dialog-title">Edit {program.title} program details</DialogTitle>
//       <div>
//         {renderErrors(errors)}
//       </div>
//       <DialogContent>
//         <AddTitle title={title} setTitle={setTitle} />
//         <AddDescription description={description} setDescription={setDescription} />
//         <ChooseColor colors={colors} color={color} setColor={setColor} />
//         <ChooseIcon icons={icons} icon={icon} setIcon={setIcon} color={color} />
//         <ActionOrCancelButtons handleClose={handleClose} onAction={onEdit} action={"Save"} />

//       </DialogContent>
//     </Dialog>
//   </>
//   )
// }


// export function ProgramDeleteForm({ program }) {
//   const {dispatchPrograms} = useContext(ProgramBoardContext)
//   const {setUser} = useContext(UserContext)
//   const [open, setOpen] = useState(false)

//   const handleOpen = (e) => setOpen(true)
//   const handleClose = (e) => setOpen(false)

//   const onDelete = async (e) => {
//     e.preventDefault()
//     setOpen(false)
//     dispatchPrograms(deleteProgram(program))
//     const res = await fetch(`/api/programs/${program.id}`, { method: "DELETE" })
//     const updated_user = await res.json()
//     setUser(updated_user)
//   }

//   return (
//     <>
//       <button onClick={handleOpen} style={{color: "gray", backgroundColor: "rgba(0,0,0,0)", borderWidth: "0"}}>
//         <i className={`fas fa-eraser`}></i>
//       </button>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Delete "{program.title}"?</DialogTitle>

//         <DialogContent>
//           <strong>Are you sure you want to PERMANENTLY delete this and all its habits?</strong>
//           <ActionOrCancelButtons onAction={onDelete} action={"Delete"} />
//         </DialogContent>

//       </Dialog>
//     </>
//   )

// }
