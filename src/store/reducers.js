import { combineReducers } from 'redux'
import employeeDashboard from 'routes/Home/modules/employeeDashboard'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    employeeDashboard,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
