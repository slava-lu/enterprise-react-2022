import { combineReducers } from 'redux'
import { shop } from '../modules/shop'
import { user } from '../modules/user'
import { cart } from '../modules/cart'
import { HYDRATE } from 'next-redux-wrapper'

export const SET_IS_SERVER = 'SET_IS_SERVER'

// this is to set a flag for initial server renders
function serverCheck(state = { isServer: false }, action) {
  const { type } = action
  switch (type) {
    case SET_IS_SERVER: {
      return { ...state, isServer: true }
    }
    default:
      return state
  }
}

//We hydrate only if this is the initial server render
function hydrate(state = {}, action) {
  const { type } = action
  switch (type) {
    case HYDRATE: {
      if (action.payload.serverCheck.isServer) {
        return { ...state, ...action.payload }
      }
      return state
    }
    default:
      return state
  }
}

const combinedReducer = combineReducers({
  serverCheck,
  shop,
  user,
  cart,
})

function rootReducer(state, action) {
  const intermediateState = combinedReducer(state, action)
  return hydrate(intermediateState, action)
}
export default rootReducer
