import { useReducer } from 'react'

export default function useThunkReducer(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  let customDispatch = (action) => {
    if (typeof action === 'function') action(customDispatch)
    else dispatch(action)
  }
  
  return [state, customDispatch]
}