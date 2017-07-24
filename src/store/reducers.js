import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import locationReducer from './location'
import userReducer from './user'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    user: userReducer,
    form: formReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
