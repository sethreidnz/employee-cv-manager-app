import { getEmployee, putEmployee } from 'api/employees'
import { createSelector } from 'reselect'

import { employeesInvalidated } from 'routes/Home/modules/employeeDashboard'

// ------------------------------------
// Constants
// ------------------------------------
const EMPLOYEE_SELECTED = 'EMPLOYEE_SELECTED'
const EMPLOYEE_REQUESTED = 'EMPLOYEE_REQUESTED'
const EMPLOYEE_REQUEST_ABORTED = 'EMPLOYEE_FOUND_IN_STATE'
const EMPLOYEE_RECEIVED = 'EMPLOYEE_RECEIVED'
const EMPLOYEE_ERROR_RECEIVED = 'EMPLOYEE_ERROR_RECEIVED'
const EMPLOYEE_UPDATE_REQUESTED = 'EMPLOYEE_UPDATE_REQUESTED'
const EMPLOYEE_UPDATE_SUCCEEDED = 'EMPLOYEE_UPDATE_SUCCEEDED'
const EMPLOYEE_UPDATE_ERROR_RECIEVED = 'EMPLOYEE_UPDATE_ERROR_RECIEVED'
const EMPLOYEE_PROFILE_INVALIDATED = 'EMPLOYEE_PROFILE_INVALIDATED'

// ------------------------------------
// Actions
// ------------------------------------
export const employeeSelected = (employeeId) => ({
  type: EMPLOYEE_SELECTED,
  employeeId: employeeId
})

export const employeeReqeusted = (employeeId) => ({
  type: EMPLOYEE_REQUESTED,
  employeeId: employeeId
})

export const employeeRequestAborted = () => ({
  type: EMPLOYEE_REQUEST_ABORTED
})

export const employeeReceived = (employee) => ({
  type: EMPLOYEE_RECEIVED,
  employee: employee
})

export const employeeErrorReceived = (error) => ({
  type: EMPLOYEE_ERROR_RECEIVED,
  error: error
})

export const employeeUpdateRequested = (updatedEmployee) => ({
  type: EMPLOYEE_UPDATE_REQUESTED,
  updatedEmployee: updatedEmployee
})

export const employeeUpdateSucceeded = (employeeId) => ({
  type: EMPLOYEE_UPDATE_SUCCEEDED,
  updatedEmployeeId: employeeId
})

export const employeeUpdateErrorRecieved = (error) => ({
  type: EMPLOYEE_UPDATE_ERROR_RECIEVED,
  error: error
})

export const employeeProfileInvalidated = (error) => ({
  type: EMPLOYEE_PROFILE_INVALIDATED,
  error: error
})

const shouldFetchEmployee = (state, employeeId) => {
  const { isFetching, isInvalidated } = state.employeeProfiles
  const selectedEmployeeInState = selectEmployeeProfileFromState(state) != null
  const employeeInvalidated = (isInvalidated && !isFetching)
  const employeeNotInState = (!selectedEmployeeInState && !isFetching)
  return employeeNotInState || employeeInvalidated
}

export const selectEmployee = (employeeId) => {
  return (dispatch, getState) => {
    dispatch(employeeSelected(employeeId))
    const state = getState()
    if (!shouldFetchEmployee(state, employeeId)) {
      dispatch(employeeRequestAborted())
    }
    dispatch(employeeReqeusted(employeeId))
    return getEmployee(employeeId).then(
            (employee) => dispatch(employeeReceived(employee)),
            (error) => dispatch(employeeErrorReceived(error))
        )
  }
}

export const updateEmployee = (updatedEmployee) => {
  return (dispatch, getState) => {
    dispatch(employeeUpdateRequested())
    return putEmployee(updatedEmployee).then(
            (employee) => {
              dispatch(employeesInvalidated())
              dispatch(employeeUpdateSucceeded(employee))
            },
            (error) => dispatch(employeeUpdateErrorRecieved(error))
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
    isFetching: false,
    hasError: false,
    error: null
  })
}

const employeeRequestedHandler = (state, action) => {
  return Object.assign({}, state, {
    selectedEmployeeId: action.employeeId,
    hasLoaded: false,
    isFetching: true,
    hasError: false,
    error: null
  })
}

const employeeRequestAbortedHandler = (state, action) => {
  return Object.assign({}, state, {
    hasLoaded: true,
    isFetching: false,
    hasError: false,
    error: null
  })
}

const employeeErrorReceivedHandler = (state, action) => {
  return Object.assign({}, state, {
    hasLoaded: true,
    isFetching: false,
    hasError: true,
    error: action.error,
    isInvalidated: false
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
    isInvalidated: false,
    isFetching: false,
    hasError: false,
    error: null
  })
}

const employeeProfileInvalidatedHandler = (state, action) => {
  return Object.assign({}, state, {
    isInvalidated: true
  })
}

const employeeUpdateRequestedHandler = (state, action) => {
  return Object.assign({}, state, {
    isFetching: true
  })
}

const employeeUpdateSuccessHandler = (state, action) => {
  return Object.assign({}, state, {
    isFetching: false,
    isInvalidated: true,
    hasLoaded: false,
    selectedEmployeeId: action.updatedEmployeeId
  })
}

const employeeUpdateErrorHandler = (state, action) => {
  return Object.assign({}, state, {
    isFetching: false,
    isInvalidated: false,
    hasLoaded: true,
    hasError: true,
    error: action.error
  })
}

const ACTION_HANDLERS = {
  [EMPLOYEE_SELECTED] : employeeSelectedHandler,
  [EMPLOYEE_REQUESTED]: employeeRequestedHandler,
  [EMPLOYEE_REQUEST_ABORTED]: employeeRequestAbortedHandler,
  [EMPLOYEE_RECEIVED] : employeeRecievedHandler,
  [EMPLOYEE_ERROR_RECEIVED] : employeeErrorReceivedHandler,
  [EMPLOYEE_PROFILE_INVALIDATED]: employeeProfileInvalidatedHandler,
  [EMPLOYEE_UPDATE_REQUESTED] : employeeUpdateRequestedHandler,
  [EMPLOYEE_UPDATE_SUCCEEDED] : employeeUpdateSuccessHandler,
  [EMPLOYEE_UPDATE_ERROR_RECIEVED] : employeeUpdateErrorHandler
}

// ------------------------------------
// Selectors
// ------------------------------------
export const selectEmployeeProfiles = (state) => state.employeeProfiles.items
export const getSelectedEmployeeId = (state) => state.employeeProfiles.selectedEmployeeId
export const employeeProfileHasError = (state) => state.employeeProfiles.hasError
export const employeeProfileHasLoaded = (state) => state.employeeProfiles.hasLoaded
export const employeeProfileError = (state) => state.employeeProfiles.error
export const employeeEditModeIsEnabled = (state) => state.employeeProfiles.editModeEnabled
export const employeeProfileIsInvalidated = (state) => state.employeeProfiles.isInvalidated

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
  isInvalidated: false,
  hasLoaded: false,
  isFetching: false,
  hasError: false,
  error: null,
  editModeEnabled: false
}

export default function employeeProfilesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
