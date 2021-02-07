import React, { createContext, useReducer } from 'react'
import rewardShopReducer, {
  setAll, createReward, editReward, deleteReward, redeemReward
} from '../reducers/rewardShopReducer'

const defaultContext = {}

const RewardShopContext = createContext(defaultContext)

export default RewardShopContext


export function RewardShopContextProvider(props) {
  const dispatchSetAll = all => dispatch(setAll(all))
  const dispatchCreateReward = reward => dispatch(createReward(reward))
  const dispatchEditReward = reward => dispatch(editReward(reward))
  const dispatchDeleteReward = reward => dispatch(deleteReward(reward))
  const dispatchRedeemReward = receipt => dispatch(redeemReward(receipt))

  const initState = {
    points: "",
    program: {},
    rewards: {},
    receipts: {},
    dispatchSetAll,
    dispatchCreateReward,
    dispatchEditReward,
    dispatchDeleteReward,
    dispatchRedeemReward,
  }

  const [state, dispatch] = useReducer(rewardShopReducer, initState)

  return (
    <RewardShopContext.Provider value={state}>
      {props.children}
    </RewardShopContext.Provider>
  )
}