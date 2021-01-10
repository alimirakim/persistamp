
// ACTION TYPES

export const GET_USER = 'GET USER'
export const UPDATE_USER = 'UPDATE_USER'
export const LOGOUT_USER = 'LOGOUT USER'

export const GET_USER_PROGRAMS = 'GET USER PROGRAMS'
export const CREATE_PROGRAM = 'CREATE PROGRAM'
export const EDIT_PROGRAM = 'EDIT PROGRAM'
export const DELETE_PROGRAM = 'DELETE PROGRAM'
export const JOIN_PROGRAM = 'JOIN PROGRAM'
export const LEAVE_PROGRAM = 'LEAVE PROGRAM'
export const RESET_PROGRAMS = 'RESET PROGRAMS'

export const GET_USER_HABITS = 'GET USER HABITS'
export const CREATE_HABIT = 'CREATE HABIT'
export const DELETE_HABIT = 'DELETE HABIT'
export const EDIT_HABIT = 'EDIT HABIT'
export const RESET_HABITS = 'RESET HABITS'

export const GET_STAMPS = 'GET STAMPS'
export const STAMP_DAY = 'STAMP DAY'
export const UNSTAMP_DAY = 'UNSTAMP DAY'
export const PEND_DAY = 'PEND DAY'
export const RESET_STAMPS = 'RESET STAMPS'

export const GET_REWARDS = 'GET REWARDS'
export const GET_PROGRAM_REWARDS = 'GET PROGRAM REWARDS'
export const CREATE_REWARD = 'CREATE REWARD'
export const EDIT_REWARD = 'EDIT_REWARD'
export const DELETE_REWARD = 'DELETE REWARD'
export const RESET_PROGRAM_REWARDS = 'RESET REWARDS'

export const GET_REDEEMED_REWARDS = 'GET REDEEMED REWARDS'
export const REDEEM_REWARD = 'REDEEM REWARD'
export const DELETE_REDEEMED = 'DELETE REDEEMED'
export const RESET_REDEEMED = 'RESET REDEEMED'



// ACTION CREATORS
export const setUser = (user) => ({ type: GET_USER, user })
export const editUser = (user) => ({ type: UPDATE_USER, user })
export const logoutUser = () => ({ type: LOGOUT_USER })

export const setStamps = (stamps) => ({ type: GET_STAMPS, stamps })
export const stampDay = (stamp) => ({ type: STAMP_DAY, stamp })
export const unstampDay = (stamp) => ({ type: UNSTAMP_DAY, stamp })
export const pendDay = (stamp) => ({ type: PEND_DAY, stamp })
export const resetStamps = () => ({ type: RESET_STAMPS })

export const setPrograms = (programs) => ({ type: GET_USER_PROGRAMS, programs })
export const createProgram = (program) => ({ type: CREATE_PROGRAM, program })
export const editProgram = (program) => ({ type: EDIT_PROGRAM, program })
export const deleteProgram = (program) => ({ type: DELETE_PROGRAM, program })
export const resetPrograms = () => ({ type: RESET_PROGRAMS })

export const setHabits = (habits) => ({ type: GET_USER_HABITS, habits })
export const createHabit = (habit) => ({ type: CREATE_HABIT, habit })
export const editHabit = (habit) => ({ type: EDIT_HABIT, habit })
export const deleteHabit = (habit) => ({ type: DELETE_HABIT, habit })
export const resetHabits = () => ({ type: RESET_HABITS })

export const setProgramRewards = (rewards) => ({ type: GET_PROGRAM_REWARDS, rewards })
export const createReward = (reward) => ({ type: CREATE_REWARD, reward })
export const editReward = (reward) => ({ type: EDIT_REWARD, reward })
export const deleteReward = (reward) => ({ type: DELETE_REWARD, reward })
export const resetProgramRewards = () => ({ type: RESET_PROGRAM_REWARDS })

export const setRedeemed = (redeemed) => ({ type: GET_REDEEMED_REWARDS, redeemed })
export const redeemReward = (redeemed) => ({ type: REDEEM_REWARD, redeemed })
export const deleteRedeemed = (redeemed) => ({ type: DELETE_REWARD, redeemed })
export const resetRedeemed = () => ({ type: RESET_REDEEMED })



// REDUCERS
export function userReducer(state = {}, action) {
  const newState = { ...state }
  switch (action.type) {
    case GET_USER:
      return action.user
    case LOGOUT_USER:
      return {}
    default:
      return state
  }
}



export function programsReducer(state = {}, action) {
  const newState = { ...state }
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
    case RESET_PROGRAMS:
      return {}

    // TODO QUESTION Why does this double the points?!?!?!???
    case STAMP_DAY:
      const program_s = Object.values(newState).find(program => program.membership_ids.includes(action.stamp.membership_id))
      newState[program_s.id].points += 0.5
      return newState
    case UNSTAMP_DAY:
      const program_u = Object.values(newState).find(program => program.membership_ids.includes(action.stamp.membership_id))
      newState[program_u.id].points -= 0.5
      return newState

    default:
      return state
  }
}


export function habitsReducer(state = {}, action) {
  const newState = { ...state }
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
    case RESET_HABITS:
      return {}

    case STAMP_DAY:
      newState[action.stamp.habit_id].stamp_ids.push(action.stamp.id)
      return newState
    case UNSTAMP_DAY:
      const stampIds = newState[action.stamp.habit_id].stamp_ids
      newState[action.stamp.habit_id].stamp_ids = stampIds.filter(sid => sid !== action.stamp.id)
      return newState

    default:
      return state
  }
}


export function stampsReducer(state = {}, action) {
  const newState = { ...state }
  switch (action.type) {
    case GET_STAMPS:
      return action.stamps
    case STAMP_DAY:
      newState[action.stamp.id] = action.stamp
      return newState
    case UNSTAMP_DAY:
      delete newState[action.stamp.id]
      return newState
    case RESET_STAMPS:
      return {}
    default:
      return state
  }
}


export function rewardsReducer(state = {}, action) {
  const newState = { ...state }
  switch (action.type) {
    case GET_PROGRAM_REWARDS:
      return action.rewards
    case CREATE_REWARD:
      newState[action.reward.id] = action.reward
      return newState
    case EDIT_REWARD:
      newState[action.reward.id] = action.reward
      return newState
    case DELETE_REWARD:
      delete newState[action.reward.id]
      return newState
    case RESET_PROGRAM_REWARDS:
      return {}
    default:
      return state
  }
}


export function redeemedReducer(state = [], action) {
  switch (action.type) {
    case GET_REDEEMED_REWARDS:
      return action.redeemed
    case REDEEM_REWARD:
      return [...state, action.redeemed]
    case DELETE_REDEEMED:
      return state.filter(reward => reward.id == action.redeemed.id)
    case RESET_REDEEMED:
      return {}
    default:
      return state
  }
}

// export function userReducer(state=[], action) {
//   const newState = {...state}
//   switch (action.type) {
//     case UPDATE_USER:
//       newState.username = action.username
//       newState.firstname = action.firstname
//       newState.lastname = action.lastname
//       newState.color.id = action.color
//       newState.stamp.id = action.stamp
//       return newState
//     default: return state
//   }
// }


// export function membershipsReducers(state={}, action) {
//   const newState = {...state}
//   switch (action.type) {
//     case GET_MEMBERSHIPS:
//       return action.memberships
//     case CREATE_MEMBERSHIP:
//       newState[action.membership.id] = action.membership
//     case 
//   }
// }