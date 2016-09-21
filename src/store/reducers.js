import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import employeeDashboard from 'routes/Home/modules/employeeDashboard'
import employeeProfiles from 'routes/EmployeeProfile/modules/employeeProfiles'


export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    employeeDashboard,
    employeeProfiles,
    form:formReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
