import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// PropTypes
import { Employee } from 'constants/PropTypes'

// Components
import Spinner from 'components/Spinner'
import Error from 'components/Error'
import { EmployeeDetails, EmployeeDetailsEdit, KeySkills, RecentProjects } from '../components'

// Actions and Selectors
import {
  selectEmployee,
  updateEmployee,
  selectEmployeeProfileFromState,
  getSelectedEmployeeId,
  employeeProfileHasError,
  employeeProfileHasLoaded,
  employeeProfileError
} from '../modules/employeeProfiles'

class EmployeeProfile extends Component {
  constructor () {
    super()
    debugger
    this.state = {
      editModeEnabled: false
    }
  }
  static propTypes = {
    params: PropTypes.shape({
      employeeId: PropTypes.string.isRequired
    }),
    selectEmployee: PropTypes.func.isRequired,
    updateEmployee: PropTypes.func.isRequired,
    selectedEmployeeId: PropTypes.string,
    employee: PropTypes.shape(Employee),
    hasLoaded: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    error: PropTypes.string,
    editingEnabled: PropTypes.bool
  }
  componentWillMount () {
    const { selectEmployee, selectedEmployeeId, params: { employeeId } } = this.props
    if (!selectedEmployeeId || selectedEmployeeId !== employeeId) {
      selectEmployee(employeeId)
    }
  }
  _renderEmployeeDetails = (employee, editModeEnabled, toggleEditMode, updateEmployee) => {
    const { firstName, lastName, role, team, biography, avatar } = employee
    if (!editModeEnabled) {
      return (
        <EmployeeDetails
          firstName={firstName}
          lastName={lastName}
          role={role}
          biography={biography}
          team={team}
          avatarUrl={avatar}
          toggleEditMode={toggleEditMode} />
        )
    }
    return (
      <EmployeeDetailsEdit
        firstName={firstName}
        lastName={lastName}
        role={role}
        biography={biography}
        team={team}
        avatarUrl={avatar}
        initialValues={employee}
        handleSubmit={updateEmployee}
        toggleEditMode={toggleEditMode} />
    )
  }
  _toggleEditMode = () => {
    this.setState({
      editModeEnabled: !this.state.editModeEnabled
    })
  }
  render = () => {
    const { hasLoaded } = this.props
    if (!hasLoaded) {
      return <Spinner />
    }

    const { hasError, error } = this.props
    if (hasError) {
      return <Error error={error} />
    }

    const { employee } = this.props
    const { updateEmployee } = this.props
    const { editModeEnabled } = this.state
    return (
      <div>
        <div className='row'>
          { this._renderEmployeeDetails(employee, editModeEnabled, this._toggleEditMode, updateEmployee) }
        </div>
        <div className='row'>
          <div className='col s12 m6'>
            <KeySkills keySkills={employee.keySkills} />
          </div>
          <div className='col s12 m6'>
            <RecentProjects recentProjects={employee.recentProjects} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  selectedEmployeeId : getSelectedEmployeeId(state),
  employee: selectEmployeeProfileFromState(state),
  hasLoaded: employeeProfileHasLoaded(state),
  hasError: employeeProfileHasError(state),
  error: employeeProfileError(state)
})

const mapDispatchToProps = (dispatch) => ({
  selectEmployee: (employeeId) => dispatch(selectEmployee(employeeId)),
  updateEmployee: (updatedEmployee) => dispatch(updateEmployee())
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProfile)
