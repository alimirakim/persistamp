
// ACTION TYPES
export const GET_USER = 'GET USER'
export const UPDATE_USER = 'UPDATE_USER'
export const LOGOUT_USER = 'LOGOUT USER'


// ACTION CREATORS
export const setUser = (user) => ({ type: GET_USER, user })
export const editUser = (user) => ({ type: UPDATE_USER, user })
export const logoutUser = () => ({ type: LOGOUT_USER })


// REDUCERS
export default function userReducer(state = {}, action) {
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
