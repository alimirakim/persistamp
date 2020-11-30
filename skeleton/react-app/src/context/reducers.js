
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

export const GET_REDEEMED_REWARDS = 'GET REDEEMED REWARDS'
export const REDEEM_REWARD = 'REDEEM REWARD'
export const DELETE_REDEEMED = 'DELETE REDEEMED'


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

export const setProgramRewards = (rewards) => ({type: GET_PROGRAM_REWARDS, rewards})
export const createReward = (reward) => ({type: CREATE_REWARD, reward})
export const editReward = (reward) => ({type: EDIT_REWARD, reward})
export const deleteReward = (reward) => ({type: DELETE_REWARD, reward})

export const setRedeemed = (redeemed) => ({type: GET_REDEEMED_REWARDS, redeemed})
export const redeemReward = (redeemed) => ({type: REDEEM_REWARD, redeemed})
export const deleteRedeemed = (redeemed) => ({type: DELETE_REWARD, redeemed})


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


export function rewardsReducer(state={}, action) {
  const newState = {...state}
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
    default:
      return state
  }
}


export function redeemedReducer(state=[], action) {
  switch (action.type) {
    case GET_REDEEMED_REWARDS:
      return action.redeemed
    case REDEEM_REWARD:
      return [...state, action.redeemed]
    case DELETE_REDEEMED:
      return state.filter(reward => reward.id == action.redeemed.id)
    default:
      return state
  }
}


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