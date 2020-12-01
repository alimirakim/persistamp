import React, { useState, useContext } from 'react'
import { Dialog, DialogTitle, DialogContent, InputLabel } from '@material-ui/core'
import UserContext from '../context/UserContext'
import HabitBoardContext from '../context/HabitBoardContext'
import OptionsContext from '../context/OptionsContext'
import { createProgram, editProgram, deleteProgram } from '../context/reducers'
import { ActionOrCancelButtons, AddName, AddDescription, ChooseColor, ChooseStamp } from './FormInputs'


export function ProgramForm() {
  const { user, setUser } = useContext(UserContext)
  const { colors, stamps } = useContext(OptionsContext)
  const { dispatchPrograms } = useContext(HabitBoardContext)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState()
  const [errors, setErrors] = useState([])
  const [description, setDescription] = useState()
  const [color, setColor] = useState(1)
  const [stamp, setStamp] = useState(2)

  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)

  const onCreate = async (e) => {
    e.preventDefault()
    setOpen(false)
    const res = await fetch(`/api/programs/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        program: name,
        description,
        color,
        stamp,
        userId: user.id
      })
    })
    console.log(res)
    if(res.ok){
      // User is updated to include new membership
      const {program, updated_user} = await res.json()
      setUser(updated_user)
      dispatchPrograms(createProgram(program))
      console.log("we made a program!", program, "user!", updated_user)
      console.log("NOW USER", user)
  
      setName()
      setDescription()
      setColor(1)
      setStamp(2)
    }else{
      setErrors(res.errors)
    }
  }

  if (!colors || !stamps) return null

  return (<>
    <button className="make-btn make-btn-big" onClick={handleOpen} style={{backgroundColor: "crimson"}}><i className="fas fa-plus-circle"></i>  Program</button>

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create a new Program!</DialogTitle>

      <DialogContent>
        <AddName name={name} setName={setName} />
        <AddDescription description={description} setDescription={setDescription} />
        <ChooseColor colors={colors} color={color} setColor={setColor} />
        <ChooseStamp stamps={stamps} stamp={stamp} setStamp={setStamp} color={color} />
        <ActionOrCancelButtons handleClose={handleClose} onAction={onCreate} action={"Create"} />

      </DialogContent>
    </Dialog>
  </>)
}


export function ProgramEditForm({ program }) {
  const { colors, stamps } = useContext(OptionsContext)
  const { dispatchPrograms } = useContext(HabitBoardContext)

  const [errors, setErrors] = useState([])
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(program.program)
  const [description, setDescription] = useState(program.description)
  const [color, setColor] = useState(program.color.id)
  const [stamp, setStamp] = useState(program.stamp.id)

  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)

  const onEdit = async (e) => {
    e.preventDefault()
    setOpen(false)
    const res = await fetch(`/api/programs/edit/${program.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        program: name,
        description,
        color,
        stamp,
      })
    })
    console.log('program-edit res: ', res)
    if(res.ok){
      const editedProgram = await res.json()
      dispatchPrograms(editProgram(editedProgram))
      console.log("we made a program!", editedProgram)
    }else{
      setErrors(res.errors)
    }
  }

  const renderErrors = (errors) => {
    if (errors) {
      return errors.map(error => {
        console.log(error)
        return <div className='material-error'>{error}</div>
      })
    }
  }

  if (!colors || !stamps) return null

  return (<>
    <button onClick={handleOpen} style={{color: "gray", backgroundColor: "rgba(0,0,0,0)", borderWidth: "0"}}>
      <i className={`fas fa-pencil-alt`}></i>
    </button>
    <div>
      {renderErrors(errors)}
    </div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit {program.program} program details</DialogTitle>
      <div>
        {renderErrors(errors)}
      </div>
      <DialogContent>
        <AddName name={name} setName={setName} />
        <AddDescription description={description} setDescription={setDescription} />
        <ChooseColor colors={colors} color={color} setColor={setColor} />
        <ChooseStamp stamps={stamps} stamp={stamp} setStamp={setStamp} color={color} />
        <ActionOrCancelButtons handleClose={handleClose} onAction={onEdit} action={"Save"} />

      </DialogContent>
    </Dialog>
  </>
  )
}


export function ProgramDeleteForm({ program }) {
  const {dispatchPrograms} = useContext(HabitBoardContext)
  const {setUser} = useContext(UserContext)
  const [open, setOpen] = useState(false)

  const handleOpen = (e) => setOpen(true)
  const handleClose = (e) => setOpen(false)

  const onDelete = async (e) => {
    e.preventDefault()
    setOpen(false)
    dispatchPrograms(deleteProgram(program))
    const res = await fetch(`/api/programs/${program.id}`, { method: "DELETE" })
    const updated_user = await res.json()
    console.log("deleted :0, user now:", updated_user)
    setUser(updated_user)
  }

  return (
    <>
      <button onClick={handleOpen} style={{color: "gray", backgroundColor: "rgba(0,0,0,0)", borderWidth: "0"}}>
        <i className={`fas fa-eraser`}></i>
      </button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete "{program.program}"?</DialogTitle>

        <DialogContent>
          <strong>Are you sure you want to PERMANENTLY delete this and all its habits?</strong>
          <ActionOrCancelButtons onAction={onDelete} action={"Delete"} />
        </DialogContent>
        
      </Dialog>
    </>
  )

}
