import React, { createContext, useReducer } from 'react';
import userReducer, { logoutUser, setUser, updateUser } from '../reducers/userReducer';

const UserContext = createContext("No user");

export default UserContext;


export function UserContextProvider(props) {
  const dispatchSetUser = user => dispatch(setUser(user))
  const dispatchUpdateUser = user => dispatch(updateUser(user))
  const dispatchLogoutUser = user => dispatch(logoutUser(user))

  const initState = {
    user: "",
    dispatchSetUser,
    dispatchUpdateUser,
    dispatchLogoutUser,
  }

  const [state, dispatch] = useReducer(userReducer, initState)

  return (
    <UserContext.Provider value={state}>
      {props.children}
    </UserContext.Provider>
  )
}