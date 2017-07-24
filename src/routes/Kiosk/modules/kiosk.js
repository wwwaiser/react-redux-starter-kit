import { LOGOUT } from 'store/user'

// ------------------------------------
// Constants
// ------------------------------------
export const SOME_CONST = 'SOME_CONST'

// ------------------------------------
// Actions
// ------------------------------------
export function someAction (value) {
  return {
    type    : SOME_CONST,
    payload : SOME_CONST
  }
}

export const SOME_CONST_ASYNC = 'SOME_CONST_ASYNC'

export const someActionAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : SOME_CONST_ASYNC,
          payload : SOME_CONST_ASYNC
        })
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  someAction,
  someActionAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SOME_CONST]    : (state, action) => state,
  [SOME_CONST_ASYNC] : (state, action) => state,
  [LOGOUT] : (state, action) => initialState
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function kioskReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
