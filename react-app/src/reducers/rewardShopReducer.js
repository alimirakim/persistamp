
// ACTION TYPES
const GET_ALL = 'GET ALL'
const GET_REWARDS = 'GET REWARDS'
const CREATE_REWARD = 'CREATE REWARD'
const EDIT_REWARD = 'EDIT_REWARD'
const DELETE_REWARD = 'DELETE REWARD'
const GET_REDEEMED_REWARDS = 'GET REDEEMED REWARDS'
const REDEEM_REWARD = 'REDEEM REWARD'
const DELETE_REDEEMED = 'DELETE REDEEMED'
const RESET_REDEEMED = 'RESET REDEEMED'

// ACTION CREATORS
export const setAll = (all) => ({ type: GET_ALL, all })
export const setRewards = (rewards) => ({ type: GET_REWARDS, rewards })
export const createReward = (reward) => ({ type: CREATE_REWARD, reward })
export const editReward = (reward) => ({ type: EDIT_REWARD, reward })
export const deleteReward = (reward) => ({ type: DELETE_REWARD, reward })

export const setRedeemed = (redeemed) => ({ type: GET_REDEEMED_REWARDS, redeemed })
export const redeemReward = (redeemed) => ({ type: REDEEM_REWARD, redeemed })
export const deleteRedeemed = (redeemed) => ({ type: DELETE_REWARD, redeemed })
export const resetRedeemed = () => ({ type: RESET_REDEEMED })


export default function rewardShopReducer(state, action) {
  const newState = { ...state }
  switch (action.type) {

    case GET_ALL:
      return { ...newState, ...action.all }
    case GET_REWARDS:
      newState.rewards = action.rewards
      return newState
    case CREATE_REWARD:
      newState.rewards[action.reward.id] = action.reward
      return newState
    case EDIT_REWARD:
      newState.rewards[action.reward.id] = action.reward
      return newState
    case DELETE_REWARD:
      delete newState.rewards[action.reward.id]
      return newState

    case GET_REDEEMED_REWARDS:
      newState.redeemed = action.redeemed
      return newState
    case REDEEM_REWARD:
      newState.redeemed[action.redeemed.id] = action.redeemed
      newState.program.points -= state.rewards[action.redeemed.reward_id].cost
      newState.rewards[action.redeemed.reward_id].quantity -= 1
      return newState
    case DELETE_REDEEMED:
      delete newState.redeemed[action.redeemed.id]
      return newState
    case RESET_REDEEMED:
      return newState.redeemed = {}

    default:
      return state
  }
}
