import Cookies from 'js-cookie'
import qs from 'querystring'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILED = 'GET_USER_FAILED'

export function getUser () {
  return {
    types: [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED],
    url: '/auth/me'
  }
}

export const GET_RANDOM_REQUEST = 'GET_RANDOM_REQUEST'
export const GET_RANDOM_SUCCESS = 'GET_RANDOM_SUCCESS'
export const GET_RANDOM_FAILED = 'GET_RANDOM_FAILED'
export function getRandom () {
  return {
    types: [GET_RANDOM_REQUEST, GET_RANDOM_SUCCESS, GET_RANDOM_FAILED],
    url: '/auth/random-number'
  }
}

export function login ({ email, password, remember }) {
  return {
    types: [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED],
    url: '/auth/login',
    method: 'POST',
    send: { email, password, remember }
  }
}

export function signup ({ email, password }) {
  return {
    types: [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED],
    url: '/auth/signup',
    method: 'POST',
    send: { email, password }
  }
}

export const LOGOUT = 'LOGOUT'
export function logout () {
  return {
    type: LOGOUT
  }
}

export const actions = {
  getUser,
  login
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGOUT]: (state, action) => {
    Cookies.set('accessToken', '')
    return { ...initialState, accessToken: '' }
  },
  [GET_USER_REQUEST]: (state, action) => ({
    ...state,
    fetchStatus: {
      value: 'LOADING'
    }
  }),
  [GET_USER_SUCCESS]: (state, action) => {
    if (action.body.token) {
      Cookies.set('accessToken', action.body.token)
    }

    return {
      ...state,
      value: action.body.user,
      accessToken: state.accessToken || action.body.token,
      fetchStatus: {
        value: 'LOADED'
      }
    }
  },
  [GET_USER_FAILED]: (state, action) => ({
    ...state,
    fetchStatus: {
      value: 'FAILED',
      errors: []
    }
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const query = qs.parse(window.location.search.slice(1))

const initialState = {
  accessToken: query.accessToken || Cookies.get('accessToken')
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
