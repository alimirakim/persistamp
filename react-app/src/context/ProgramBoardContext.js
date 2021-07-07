import React, { createContext, useReducer } from 'react';

import programBoardReducer, {
  setAll, setWeek,
  setPrograms, createProgram, editProgram, deleteProgram,
  setActivities, addActivity, createActivity, editActivity, deleteActivity,
  setStamps, stampDay, unstampDay,
} from '../reducers/programBoardReducer'

const defaultContext = { programs: {}, activities: {}, stamps: {} }

const ProgramBoardContext = createContext(defaultContext)

export default ProgramBoardContext


export function ProgramBoardContextProvider(props) {
  const dispatchSetWeek = week => dispatch(setWeek(week))
  const dispatchSetAll = all => dispatch(setAll(all))

  const dispatchSetPrograms = programs => dispatch(setPrograms(programs))
  const dispatchCreateProgram = program => dispatch(createProgram(program))
  const dispatchEditProgram = program => dispatch(editProgram(program))
  const dispatchDeleteProgram = program => dispatch(deleteProgram(program))

  const dispatchSetActivities = activities => dispatch(setActivities(activities))
  const dispatchAddActivity = activity => dispatch(addActivity(activity))
  const dispatchCreateActivity = activity => dispatch(createActivity(activity))
  const dispatchEditActivity = activity => dispatch(editActivity(activity))
  const dispatchDeleteActivity = activity => dispatch(deleteActivity(activity))

  const dispatchSetStamps = stamps => dispatch(setStamps(stamps))
  
  // TODO: Update these two to also handle updating user points
  const dispatchStampDay = stamp => dispatch(stampDay(stamp))
  const dispatchUnstampDay = stamp => dispatch(unstampDay(stamp))

  const initState = {
    programs: {},
    activities: {},
    stamps: {},
    week: [],
    dispatchSetWeek,
    dispatchSetAll,
    dispatchSetPrograms,
    dispatchCreateProgram,
    dispatchEditProgram,
    dispatchDeleteProgram,
    dispatchSetActivities,
    dispatchAddActivity,
    dispatchCreateActivity,
    dispatchEditActivity,
    dispatchDeleteActivity,
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
