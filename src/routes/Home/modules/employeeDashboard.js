import { getEmployees } from 'api/employees'

// ------------------------------------
// Constants
// ------------------------------------
const EMPLOYEES_REQUESTED = 'EMPLOYEES_REQUESTED'
const EMPLOYEES_RECEIVED = 'EMPLOYEES_RECEIVED'
const EMPLOYEES_ERROR_RECEIVED = 'EMPLOYEES_ERROR_RECEIVED'
const EMPLOYEES_INVALIDED = 'EMPLOYEES_INVALIDED'

// ------------------------------------
// Actions
// ------------------------------------
export const employeesRequested = () => ({
  type: EMPLOYEES_REQUESTED
})

export const employeesReceived = (employees) => ({
  type: EMPLOYEES_RECEIVED,
  employees: employees
})

export const employeesErrorReceived = (error) => ({
  type: EMPLOYEES_ERROR_RECEIVED,
  error: error
})

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */
export const requestEmployees = () => {
  return (dispatch, getState) => {
    const state = getState()
    const { hasLoaded, isFetching, isInvalidated } = state.employeeDashboard
    if ((!isInvalidated && hasLoaded) || isFetching) return

    dispatch(employeesRequested())
    return getEmployees().then(
            (employees) => dispatch(employeesReceived(employees)),
            (error) => dispatch(employeesErrorReceived(error))
    )
  }
}

export const employeesInvalidated = () => ({
  type: EMPLOYEES_INVALIDED
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const employeesRequestedHandler = (state, action) => {
  return Object.assign({}, state, {
    items: [],
    hasLoaded: false,
    isFetching: true,
    hasError: false,
    error: null
  })
}

const employeesReceivedHandler = (state, action) => {
  return Object.assign({}, state, {
    items: action.employees,
    hasLoaded: true,
    isFetching: false,
    hasError: false,
    isInvalidated: false,
    error: null
  })
}

const employeesRequestedErrorHandler = (state, action) => {
  return Object.assign({}, state, {
    items: [],
    hasLoaded: true,
    isFetching: false,
    hasError: true,
    isInvalidated: false,
    error: action.error
  })
}

const employeesInvalidatedHandler = (state, action) => {
  return Object.assign({}, state, {
    isInvalidated: true
  })
}

const ACTION_HANDLERS = {
  [EMPLOYEES_REQUESTED] : employeesRequestedHandler,
  [EMPLOYEES_RECEIVED] : employeesReceivedHandler,
  [EMPLOYEES_ERROR_RECEIVED] : employeesRequestedErrorHandler,
  [EMPLOYEES_INVALIDED]: employeesInvalidatedHandler
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  items: [],
  hasLoaded: false,
  isFetching: false,
  hasError: false,
  isInvalidated: false,
  error: null
}

export default function employeeDashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
