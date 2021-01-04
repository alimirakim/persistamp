import React, { useState, useContext } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import UserContext from '../context/UserContext';
import OptionsContext from '../context/OptionsContext';
import HabitBoardContext from '../context/HabitBoardContext'
import { habitCreate } from '../services/auth';
import { createHabit } from '../context/reducers'
import { ActionOrCancelButtons, AddName, AddDescription, ChooseFrequency, ChooseColor, ChooseStamp } from './FormInputs'

function HabitForm({ pid, program }) {
  const { user } = useContext(UserContext)
  const { colors, stamps } = useContext(OptionsContext)
  const {dispatchHabits} = useContext(HabitBoardContext)
  
  const [errors, setErrors] = useState([])
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [frequency, setFrequency] = useState(7)
  const [color, setColor] = useState(1)
  const [stamp, setStamp] = useState(3)

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)

  const onCreate = async (e) => {
    e.preventDefault()
    const userId = user.id
    const newHabit = await habitCreate(
      name,
      description,
      frequency,
      color,
      stamp,
      userId,
      pid,
      )
    if(!newHabit.errors){
      dispatchHabits(createHabit(newHabit))
      setOpen(false)
      setName()
      setDescription()
      setFrequency(7)
      setColor(1)
      setStamp(3)
    }else{
      setErrors(newHabit.errors)
    }
  }

  const renderErrors = (errors) => {
    if (errors) {
      console.log("trying to render user setting errors")
      return errors.map(error => {
        console.log(error)
        return <div className='material-error'>{error}</div>
      })
    }
  }
  console.log("WHAT R U PROGRAM HEX", program)
  if (!colors || !stamps) return null

  return (
    <>
      <button className="make-btn" onClick={handleClickOpen} style={{backgroundColor: program.color.hex, color: "black"}}><i className="fas fa-plus-circle"></i> Habit</button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a habit to {program.program}!</DialogTitle>
        <div>
          {renderErrors(errors)}
        </div>
        <DialogContent className='user-settings'>
          <AddName name={name} setName={setName} />
          <AddDescription description={description} setDescription={setDescription} />
          <ChooseFrequency frequency={frequency} setFrequency={setFrequency} />
          <ChooseColor colors={colors} color={color} setColor={setColor} />
          <ChooseStamp stamps={stamps} stamp={stamp} setStamp={setStamp} color={color} />
          <ActionOrCancelButtons handleClose={handleClose} onAction={onCreate} action={"Create"} />
        </DialogContent>

      </Dialog>
    </>
  )
}

export default HabitForm
