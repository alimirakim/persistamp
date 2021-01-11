import React, { createContext, useReducer } from 'react';

import programBoardReducer, {
  setAll, setWeek,
  setPrograms, createProgram, editProgram, deleteProgram,
  setHabits, createHabit, editHabit, deleteHabit,
  setStamps, stampDay, unstampDay,
} from '../reducers/programBoardReducer'

const defaultContext = { programs: {}, habits: {}, stamps: {} }

const ProgramBoardContext = createContext(defaultContext)

export default ProgramBoardContext


export function ProgramBoardContextProvider(props) {
  const dispatchSetWeek = week => dispatch(setWeek(week))
  const dispatchSetAll = all => dispatch(setAll(all))

  const dispatchSetPrograms = programs => dispatch(setPrograms(programs))
  const dispatchCreateProgram = program => dispatch(createProgram(program))
  const dispatchEditProgram = program => dispatch(editProgram(program))
  const dispatchDeleteProgram = program => dispatch(deleteProgram(program))

  const dispatchSetHabits = habits => dispatch(setHabits(habits))
  const dispatchCreateHabit = habit => dispatch(createHabit(habit))
  const dispatchEditHabit = habit => dispatch(editHabit(habit))
  const dispatchDeleteHabit = habit => dispatch(deleteHabit(habit))

  const dispatchSetStamps = stamps => dispatch(setStamps(stamps))
  const dispatchStampDay = stamp => dispatch(stampDay(stamp))
  const dispatchUnstampDay = stamp => dispatch(unstampDay(stamp))

  const initState = {
    programs: {},
    habits: {},
    stamps: {},
    week: [],
    dispatchSetWeek,
    dispatchSetAll,
    dispatchSetPrograms,
    dispatchCreateProgram,
    dispatchEditProgram,
    dispatchDeleteProgram,
    dispatchSetHabits,
    dispatchCreateHabit,
    dispatchEditHabit,
    dispatchDeleteHabit,
    dispatchSetStamps,
    dispatchStampDay,
    dispatchUnstampDay,
  }

  const [state, dispatch] = useReducer(programBoardReducer, initState)

  return (
    <ProgramBoardContext.Provider value={state}>
      {props.children}
    </ProgramBoardContext.Provider>
  )
}
