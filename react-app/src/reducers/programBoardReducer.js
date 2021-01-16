
// ACTION TYPES
export const GET_ALL = 'GET ALL'
export const GET_WEEK = 'GET WEEK'

export const GET_USER_PROGRAMS = 'GET USER PROGRAMS'
export const CREATE_PROGRAM = 'CREATE PROGRAM'
export const EDIT_PROGRAM = 'EDIT PROGRAM'
export const DELETE_PROGRAM = 'DELETE PROGRAM'
export const JOIN_PROGRAM = 'JOIN PROGRAM'
export const LEAVE_PROGRAM = 'LEAVE PROGRAM'
export const RESET_PROGRAMS = 'RESET PROGRAMS'

export const GET_USER_HABITS = 'GET USER HABITS'
export const ADD_HABIT = 'ADD HABIT'
export const CREATE_HABIT = 'CREATE HABIT'
export const DELETE_HABIT = 'DELETE HABIT'
export const EDIT_HABIT = 'EDIT HABIT'
export const RESET_HABITS = 'RESET HABITS'

export const GET_STAMPS = 'GET STAMPS'
export const STAMP_DAY = 'STAMP DAY'
export const UNSTAMP_DAY = 'UNSTAMP DAY'
export const PEND_DAY = 'PEND DAY'
export const RESET_STAMPS = 'RESET STAMPS'


// ACTION CREATORS
export const setAll = (all) => ({ type: GET_ALL, all })
export const setWeek = (week) => ({type: GET_WEEK, week})

export const setPrograms = (programs) => ({ type: GET_USER_PROGRAMS, programs })
export const createProgram = (program) => ({ type: CREATE_PROGRAM, program })
export const editProgram = (program) => ({ type: EDIT_PROGRAM, program })
export const deleteProgram = (program) => ({ type: DELETE_PROGRAM, program })
export const resetPrograms = () => ({ type: RESET_PROGRAMS })

export const setHabits = (habits) => ({ type: GET_USER_HABITS, habits })
export const addHabit = (habit) => ({ type: ADD_HABIT, habit })
export const createHabit = (habit) => ({ type: CREATE_HABIT, habit })
export const editHabit = (habit) => ({ type: EDIT_HABIT, habit })
export const deleteHabit = (habit) => ({ type: DELETE_HABIT, habit })
export const resetHabits = () => ({ type: RESET_HABITS })

export const setStamps = (stamps) => ({ type: GET_STAMPS, stamps })
export const stampDay = (stamp) => ({ type: STAMP_DAY, stamp })
export const unstampDay = (stamp) => ({ type: UNSTAMP_DAY, stamp })
export const pendDay = (stamp) => ({ type: PEND_DAY, stamp })
export const resetStamps = () => ({ type: RESET_STAMPS })


export default function programBoardReducer(state = {
  programs: {}, habits: {}, stamps: {},
}, action) {
  const newState = { ...state }

  switch (action.type) {
    case GET_ALL:
      return { ...newState, ...action.all }


    case GET_USER_PROGRAMS:
      newState.programs = action.programs
      return newState
    case CREATE_PROGRAM:
      newState.programs[action.program.id] = action.program
      return newState
    case DELETE_PROGRAM:
      // delete stamps, then habits, then program
      delete newState.programs[action.program.id]
      return newState
    case EDIT_PROGRAM:
      newState.programs[action.program.id] = action.program
      return newState

    // HABITS      
    case GET_USER_HABITS:
      return newState.actions = action.habits
    case ADD_HABIT:
        newState.habits[action.habit.id] = action.habit
        return newState
    case CREATE_HABIT:
      newState.habits[action.habit.id] = action.habit
      // Add the habit id to its program hid list
      newState.programs[action.habit.pid].hids = [...newState.programs[action.habit.pid].hids, action.habit.id]
      // Add the week's stamps for the habit
      return newState
    case DELETE_HABIT:
      // Delete week's stamps for habit
      delete newState.habits[action.habit.id]
      newState.programs[action.habit.pid].hids = newState.programs[action.habit.pid].hids.filter(hid => hid !== action.habit.id)
      return newState
    case EDIT_HABIT:
      newState.habits[action.habit.id] = action.habit
      return newState

    // TODO QUESTION Why does this double the points?!?!?!???
    // STAMPS
    case STAMP_DAY:
      // Add stamp id to habit id
      newState.habits[action.stamp.hid].sids = [...newState.habits[action.stamp.hid].sids, action.stamp.id]
      // Find program that includes membership id of the stamp
      const stampedProgram = Object.values(state.programs).find(p => p.mids.includes(action.stamp.mid))
      newState.programs[stampedProgram.id].points += 1
      newState.stamps[action.stamp.id] = action.stamp
      return newState

    case UNSTAMP_DAY:
      // Remove stamp id from habit id
      newState.habits[action.stamp.hid].sids = newState.habits[action.stamp.hid].sids.filter(sid => sid !== action.stamp.id)
      // Find program that includes membership id of the stamp
      const unstampedProgram = Object.values(state.programs).find(program => program.mids.includes(action.stamp.mid))
      newState.programs[unstampedProgram.id].points -= 1
      delete newState.stamps[action.stamp.id]
      return newState

    default:
      return state
  }
}
