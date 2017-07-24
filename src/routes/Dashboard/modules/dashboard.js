// ------------------------------------
// Constants
// ------------------------------------
import { LOGOUT, GET_RANDOM_SUCCESS } from 'store/user'

export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          payload : getState().counter
        })
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  increment,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2,
  [GET_RANDOM_SUCCESS]   : (state, action) => {
    return Math.round(action.body.num)
  },
  [LOGOUT] : (state, action) => initialState
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
