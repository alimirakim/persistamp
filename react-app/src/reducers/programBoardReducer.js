
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

export const setActivities = (activities) => ({ type: GET_USER_HABITS, activities })
export const addActivity = (activity) => ({ type: ADD_HABIT, activity })
export const createActivity = (activity) => ({ type: CREATE_HABIT, activity })
export const editActivity = (activity) => ({ type: EDIT_HABIT, activity })
export const deleteActivity = (activity) => ({ type: DELETE_HABIT, activity })
export const resetActivities = () => ({ type: RESET_HABITS })

export const setStamps = (stamps) => ({ type: GET_STAMPS, stamps })
export const stampDay = (stamp) => ({ type: STAMP_DAY, stamp })
export const unstampDay = (stamp) => ({ type: UNSTAMP_DAY, stamp })
export const pendDay = (stamp) => ({ type: PEND_DAY, stamp })
export const resetStamps = () => ({ type: RESET_STAMPS })


export default function programBoardReducer(state = {
  programs: {}, activities: {}, stamps: {},
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
      // delete stamps, then activities, then program
      delete newState.programs[action.program.id]
      return newState
    case EDIT_PROGRAM:
      newState.programs[action.program.id] = action.program
      return newState

    // HABITS      
    case GET_USER_HABITS:
      return newState.actions = action.activities
    case ADD_HABIT:
        newState.activities[action.activity.id] = action.activity
        return newState
    case CREATE_HABIT:
      newState.activities[action.activity.id] = action.activity
      // Add the activity id to its program aid list
      newState.programs[action.activity.pid].aids = [...newState.programs[action.activity.pid].aids, action.activity.id]
      // Add the week's stamps for the activity
      return newState
    case DELETE_HABIT:
      // Delete week's stamps for activity
      delete newState.activities[action.activity.id]
      newState.programs[action.activity.pid].aids = newState.programs[action.activity.pid].aids.filter(aid => aid !== action.activity.id)
      return newState
    case EDIT_HABIT:
      newState.activities[action.activity.id] = action.activity
      return newState

    // TODO QUESTION Why does this double the points?!?!?!???
    // STAMPS
    case STAMP_DAY:
      // Add stamp id to activity id
      newState.activities[action.stamp.aid].sids = [...newState.activities[action.stamp.aid].sids, action.stamp.id]
      // Find program that includes membership id of the stamp
      const stampedProgram = Object.values(state.programs).find(p => p.mids.includes(action.stamp.mid))
      newState.programs[stampedProgram.id].points += 1
      newState.stamps[action.stamp.id] = action.stamp
      return newState

    case UNSTAMP_DAY:
      // Remove stamp id from activity id
      newState.activities[action.stamp.aid].sids = newState.activities[action.stamp.aid].sids.filter(sid => sid !== action.stamp.id)
      // Find program that includes membership id of the stamp
      const unstampedProgram = Object.values(state.programs).find(program => program.mids.includes(action.stamp.mid))
      newState.programs[unstampedProgram.id].points -= 1
      delete newState.stamps[action.stamp.id]
      return newState

    default:
      return state
  }
}
