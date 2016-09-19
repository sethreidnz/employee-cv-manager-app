import { getEmployee } from 'api/employees'
import { createSelector } from 'reselect'

// ------------------------------------
// Constants
// ------------------------------------
const EMPLOYEE_SELECTED = 'EMPLOYEE_SELECTED'
const EMPLOYEE_REQUESTED = 'EMPLOYEE_REQUESTED'
const EMPLOYEE_REQUEST_ABORTED = 'EMPLOYEE_FOUND_IN_STATE'
const EMPLOYEE_RECEIVED = 'EMPLOYEE_RECEIVED'
const EMPLOYEE_ERROR_RECEIVED = 'EMPLOYEE_ERROR_RECEIVED'

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

const shouldFetchEmployee = (state) => {
  const { isFetching } = state.employeeProfiles
  const selectedEmployeeInState = selectEmployeeProfileFromState(state) != null
  return !selectedEmployeeInState && !isFetching
}

export const selectEmployee = (employeeId) => {
  return (dispatch, getState) => {
    dispatch(employeeSelected(employeeId))
    const state = getState()
    const selectedEmployeeInState = selectEmployeeProfileFromState(state)
    if (selectedEmployeeInState) {
      dispatch(employeeRequestAborted())
    }
    if (!shouldFetchEmployee(state)) return
    dispatch(employeeReqeusted(employeeId))
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
  [EMPLOYEE_REQUESTED]: employeeRequestedHandler,
  [EMPLOYEE_REQUEST_ABORTED]: employeeRequestAbortedHandler,
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
