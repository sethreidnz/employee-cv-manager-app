import { combineReducers } from 'redux'
import employeeDashboard from 'routes/Home/modules/employeeDashboard'
import employeeProfile from 'routes/EmployeeProfile/modules/employeeProfile'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    employeeDashboard,
    employeeProfile,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
