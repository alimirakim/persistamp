
// ACTION TYPES
export const GET_USER_PROGRAMS = 'GET USER PROGRAMS'
export const CREATE_PROGRAM = 'CREATE PROGRAM'
export const EDIT_PROGRAM = 'EDIT PROGRAM'
export const DELETE_PROGRAM = 'DELETE PROGRAM'
export const JOIN_PROGRAM = 'JOIN PROGRAM'
export const LEAVE_PROGRAM = 'LEAVE PROGRAM'

export const GET_USER_HABITS = 'GET USER HABITS'
export const CREATE_HABIT = 'CREATE HABIT'
export const DELETE_HABIT = 'DELETE HABIT'
export const EDIT_HABIT = 'EDIT HABIT'

export const GET_DAILY_STAMPS = 'GET_DAILY_STAMPS'
export const STAMP_DAY = 'STAMP_DAY'
export const UNSTAMP_DAY = 'UNSTAMP_DAY'
export const PEND_DAY = 'PEND_DAY'

export const GET_REWARDS = 'GET REWARDS'
export const GET_PROGRAM_REWARDS = 'GET PROGRAM REWARDS'
export const CREATE_REWARD = 'CREATE REWARD'
export const EDIT_REWARD = 'EDIT_REWARD'
export const DELETE_REWARD = 'DELETE REWARD'


// ACTION CREATORS
export const setDailies = (dailies) => ({ type: GET_DAILY_STAMPS, dailies })
export const stampDay = (daily) => ({ type: STAMP_DAY, daily })
export const unstampDay = (daily) => ({ type: UNSTAMP_DAY, daily })
export const pendDay = (daily) => ({ type: PEND_DAY, daily })

export const setPrograms = (programs) => ({ type: GET_USER_PROGRAMS, programs })
export const createProgram = (program) => ({ type: CREATE_PROGRAM, program })
export const editProgram = (program) => ({ type: EDIT_PROGRAM, program })
export const deleteProgram = (program) => ({ type: DELETE_PROGRAM, program })

export const setHabits = (habits) => ({ type: GET_USER_HABITS, habits })
export const createHabit = (habit) => ({ type: CREATE_HABIT, habit })
export const editHabit = (habit) => ({ type: EDIT_HABIT, habit })
export const deleteHabit = (habit) => ({ type: DELETE_HABIT, habit })


// THUNK ACTION CREATORS
// do it directly

  
//   const res = await fetch(`/habits/${hid}/programs/${pid}/members/${mid}/days/${day}`, {method: "POST"})
//   const stamp = await res.json()
//   dispatch(stampDay(stamp))
  


// export const deleteStamp = ({pid, mid, hid, day}) => async (dispatch) => {
//   const res = await fetch(`/habits/${hid}/programs/${pid}/members/${mid}/days/${day}`, {method: "DELETE"})
//   const stamp = await res.json()
//   dispatch(unstampDay(stamp))
// }


// REDUCERS
export function programsReducer(state = {}, action) {
  const newState = {...state}
  switch (action.type) {
    case GET_USER_PROGRAMS:
      return action.programs
    case CREATE_PROGRAM:
      newState[action.program.id] = action.program
      return newState
    case DELETE_PROGRAM:
      delete newState[action.program.id]
      return newState
    case EDIT_PROGRAM:
      newState[action.program.id] = action.program
      return newState
    default:
      return state
  }
}


export function habitsReducer(state = {}, action) {
  const newState = {...state}
  switch (action.type) {
    case GET_USER_HABITS:
      return action.habits
    case CREATE_HABIT:
      newState[action.habit.id] = action.habit
      return newState
    case DELETE_HABIT:
      delete newState[action.habit.id]
      return newState
    case EDIT_HABIT:
      newState[action.habit.id] = action.habit
      return newState
    default:
      return state
  }
}


export function dailiesReducer(state = {}, action) {
  const newState = {...state}
  switch (action.type) {
    case GET_DAILY_STAMPS:
      return action.dailies
    case STAMP_DAY:
      newState[action.daily.id] = action.daily
      return newState
    case UNSTAMP_DAY:
      delete newState[action.daily.id]
      return newState
    default:
      return state
  }
}
