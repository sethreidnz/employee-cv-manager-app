import { getEmployee } from 'api/employees'

// ------------------------------------
// Constants
// ------------------------------------
const EMPLOYEE_SELECTED = 'EMPLOYEE_SELECTED'
const EMPLOYEE_RECEIVED = 'EMPLOYEE_RECEIVED'
const EMPLOYEE_ERROR_RECEIVED = 'EMPLOYEE_ERROR_RECEIVED'

// ------------------------------------
// Actions
// ------------------------------------
export const employeeSelected = (employeeId) => ({
  type: EMPLOYEE_SELECTED,
  employeeId: employeeId
})

export const employeeReceived = (employee) => ({
  type: EMPLOYEE_RECEIVED,
  employee: employee
})

export const employeeErrorReceived = (error) => ({
  type: EMPLOYEE_ERROR_RECEIVED,
  error: error
})

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */
export const requestEmployee = (employeeId) => {
  return (dispatch, getState) => {
    const state = getState()
    const { hasLoaded, isFetching } = state.employeeProfile
    if (isFetching || (hasLoaded && employeeId === state.employeeProfile.id)) return

    dispatch(employeeSelected(employeeId))
    return getEmployee(employeeId).then(
            (employee) => dispatch(employeeReceived(employee)),
            (error) => dispatch(employeeErrorReceived(error))
        )
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
// ------------------------------------
const employeeSelectedHandler = (state, action) => {
  return Object.assign({}, state, {
    item: null,
    hasLoaded: false,
    isFetching: true,
    hasError: false,
    error: null
  })
}

const employeeRecievedHandler = (state, action) => {
  return Object.assign({}, state, {
    item: action.employee,
    hasLoaded: true,
    isFetching: false,
    hasError: false,
    error: null
  })
}

const employeeSelectedErrorHandler = (state, action) => {
  return Object.assign({}, state, {
    item: null,
    hasLoaded: true,
    isFetching: false,
    hasError: true,
    error: action.error
  })
}

const ACTION_HANDLERS = {
  [EMPLOYEE_SELECTED] : employeeSelectedHandler,
  [EMPLOYEE_RECEIVED] : employeeRecievedHandler,
  [EMPLOYEE_ERROR_RECEIVED] : employeeSelectedErrorHandler
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  item: null,
  hasLoaded: false,
  isFetching: false,
  hasError: false,
  error: null
}

export default function employeeDashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
