
// ACTION TYPES
export const GET_USER = 'GET USER'
export const UPDATE_USER = 'UPDATE_USER'
export const LOGOUT_USER = 'LOGOUT USER'
export const ADD_USER_POINTS = 'ADD_USER_POINTS'


// ACTION CREATORS
export const setUser = (user) => ({ type: GET_USER, user })
export const updateUser = (user) => ({ type: UPDATE_USER, user })
export const addUserPoints = (points) => ({ type: ADD_USER_POINTS, points })
export const logoutUser = () => ({ type: LOGOUT_USER })


// REDUCERS
export default function userReducer(state = {}, action) {
  switch (action.type) {

    case GET_USER:
      return action.user
    case UPDATE_USER:
      return {...state, ...action.user}
    case LOGOUT_USER:
      return {}
    case ADD_USER_POINTS:
      return {...state, points: action.points}
    default:
      return state
  }
}
