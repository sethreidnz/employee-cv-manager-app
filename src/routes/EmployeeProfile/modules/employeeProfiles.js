import { getEmployee } from 'api/employees'
import { createSelector } from 'reselect'

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
export const selectEmployee = (employeeId) => {
  return (dispatch, getState) => {
    const state = getState()
    const { hasLoaded, isFetching } = state.employeeProfiles
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
    selectedEmployeeId: action.employeeId,
    hasLoaded: false,
    isFetching: true,
    hasError: false,
    error: null
  })
}

const employeeRecievedHandler = (state, action) => {
  const employeeProfiles = state.items
  const recievedEmployeeIndex = employeeProfiles.findIndex((employee) => {
    return employee.id === action.employee.id
  })
  let newEmployeeProfileList
  if (recievedEmployeeIndex >= 0) {
    newEmployeeProfileList = [
      ...employeeProfiles.slice(0, recievedEmployeeIndex),
      action.employee,
      ...employeeProfiles.slice(recievedEmployeeIndex + 1, employeeProfiles.length)
    ]
  } else {
    newEmployeeProfileList = [
      ...employeeProfiles,
      action.employee
    ]
  }
  return Object.assign({}, state, {
    items: newEmployeeProfileList,
    selectedEmployeeId: action.employee ? action.employee.id : null,
    hasLoaded: true,
    isFetching: false,
    hasError: false,
    error: null
  })
}

const employeeSelectedErrorHandler = (state, action) => {
  return Object.assign({}, state, {
    items: [],
    selectedEmployeeId: null,
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
// Selectors
// ------------------------------------
export const selectEmployeeProfiles = (state) => state.employeeProfiles.items
export const getSelectedEmployeeId = (state) => state.employeeProfiles.selectedEmployeeId
export const employeeProfileHasError = (state) => state.employeeProfiles.hasError
export const employeeProfileHasLoaded = (state) => state.employeeProfiles.hasLoaded
export const employeeProfileError = (state) => state.employeeProfiles.error

export const selectEmployeeProfileFromState = createSelector(
  selectEmployeeProfiles,
  getSelectedEmployeeId,
  (profiles, selectedEmployeeId) => {
    if (!selectedEmployeeId) return null
    const profile = profiles.filter(profile => profile.id === selectedEmployeeId)
    if (profile.length <= 0) return null
    return profile[0]
  }
)

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  items: [],
  selectedEmployeeId: null,
  hasLoaded: false,
  isFetching: false,
  hasError: false,
  error: null
}

export default function employeeProfilesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
