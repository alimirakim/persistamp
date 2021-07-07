
// ACTION TYPES
export const GET_USER = 'GET USER'
export const UPDATE_USER = 'UPDATE_USER'
export const LOGOUT_USER = 'LOGOUT USER'
const STAMP_USER_DAY = 'STAMP USER DAY'
const UNSTAMP_USER_DAY = 'UNSTAMP USER DAY'


// ACTION CREATORS
export const setUser = (user) => ({ type: GET_USER, user })
export const updateUser = (user) => ({ type: UPDATE_USER, user })
export const logoutUser = () => ({ type: LOGOUT_USER })


// REDUCERS
export default function userReducer(state = {}, action) {
  const newState = { ...state }

  switch (action.type) {
    case GET_USER:
      return action.user
    case UPDATE_USER:
      return {...state, ...action.user}
    case LOGOUT_USER:
      return {}

    case STAMP_USER_DAY:
      newState.points += action.points
      return newState

    case UNSTAMP_USER_DAY:
      newState.points -= action.points
      return newState

    default:
      return state
  }
}
