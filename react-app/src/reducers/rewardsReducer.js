
// ACTION TYPES
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
export const setProgramRewards = (rewards) => ({ type: GET_PROGRAM_REWARDS, rewards })
export const createReward = (reward) => ({ type: CREATE_REWARD, reward })
export const editReward = (reward) => ({ type: EDIT_REWARD, reward })
export const deleteReward = (reward) => ({ type: DELETE_REWARD, reward })
export const resetProgramRewards = () => ({ type: RESET_PROGRAM_REWARDS })

export const setRedeemed = (redeemed) => ({ type: GET_REDEEMED_REWARDS, redeemed })
export const redeemReward = (redeemed) => ({ type: REDEEM_REWARD, redeemed })
export const deleteRedeemed = (redeemed) => ({ type: DELETE_REWARD, redeemed })
export const resetRedeemed = () => ({ type: RESET_REDEEMED })


export default function rewardsReducer(state = {rewards: {}, redeemed: {} }, action) {
  const newState = { ...state }
  switch (action.type) {
    
    case GET_PROGRAM_REWARDS:
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
    case RESET_PROGRAM_REWARDS:
      newState.rewards = {}
      return newState

    case GET_REDEEMED_REWARDS:
      newState.redeemed = action.redeemed
      return newState
    case REDEEM_REWARD:
      newState.redeemed[action.redeemed.id] = action.redeemed
    case DELETE_REDEEMED:
      delete newState.redeemed[action.redeemed.id]
      return newState
    case RESET_REDEEMED:
      return newState.redeemed = {}
      
    default:
      return state
  }
}
