
// ACTION TYPES
const GET_ALL = 'GET ALL'
const GET_REWARDS = 'GET REWARDS'
const CREATE_REWARD = 'CREATE REWARD'
const EDIT_REWARD = 'EDIT_REWARD'
const DELETE_REWARD = 'DELETE REWARD'
const GET_RECEIPT_REWARDS = 'GET RECEIPT REWARDS'
const REDEEM_REWARD = 'REDEEM REWARD'
const DELETE_RECEIPT = 'DELETE RECEIPT'
const RESET_RECEIPTS = 'RESET RECEIPTS'

// ACTION CREATORS
export const setAll = (all) => ({ type: GET_ALL, all })
export const setRewards = (rewards) => ({ type: GET_REWARDS, rewards })
export const createReward = (reward) => ({ type: CREATE_REWARD, reward })
export const editReward = (reward) => ({ type: EDIT_REWARD, reward })
export const deleteReward = (reward) => ({ type: DELETE_REWARD, reward })

export const setReceipt = (receipt) => ({ type: GET_RECEIPT_REWARDS, receipt })
export const redeemReward = (receipt) => ({ type: REDEEM_REWARD, receipt })
export const deleteReceipt = (receipt) => ({ type: DELETE_REWARD, receipt })
export const resetReceipt = () => ({ type: RESET_RECEIPTS })


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
    case GET_RECEIPT_REWARDS:
      newState.receipts = action.receipts
      return newState
    case REDEEM_REWARD:
      newState.receipts[action.receipt.id] = action.receipt
      newState.points -= state.rewards[action.receipt.rew_id].cost
      newState.rewards[action.receipt.rew_id].quantity -= 1
      newState.rewards[action.receipt.rew_id].receipts_count += 1
      newState.rewards[action.receipt.rew_id].last_created_at = action.receipt.created_at
      return newState
    case DELETE_RECEIPT:
      delete newState.receipts[action.receipt.id]
      return newState
    case RESET_RECEIPTS:
      return newState.receipts = {}

    default:
      return state
  }
}
