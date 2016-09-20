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
  employeeProfileError,
  employeeEditModeToggled,
  employeeEditModeIsEnabled
} from '../modules/employeeProfiles'

class EmployeeProfile extends Component {
  componentWillMount () {
    const { selectEmployee, selectedEmployeeId, params: { employeeId } } = this.props
    if (!selectedEmployeeId || selectedEmployeeId !== employeeId) {
      selectEmployee(employeeId)
    }
  }
  _renderEmployeeDetails = (editModeEnabled, employee) => {
    const { firstName, lastName, role, team, biography, avatar } = employee
    if (!editModeEnabled) {
      return (
        <EmployeeDetails
          firstName={firstName}
          lastName={lastName}
          role={role}
          biography={biography}
          team={team}
          avatarUrl={avatar} />
        )
    }
    debugger
    return (
      <EmployeeDetailsEdit
        firstName={firstName}
        lastName={lastName}
        role={role}
        biography={biography}
        team={team}
        avatarUrl={avatar}
        initialValues={employee} />
    )
  }
  _renderControls = (editModeEnabled, toggleEditMode, updateEmployee) => {
    let controlButtons
    if (editModeEnabled) {
      controlButtons = (
        <div>
          <a onClick={updateEmployee} className='btn'>Save</a>
          <a onClick={toggleEditMode} className='btn'>Cancel</a>
        </div>
      )
    } else {
      controlButtons = (
        <div>
          <a onClick={toggleEditMode} className='btn'>Edit</a>
        </div>
      )
    }
    return (
      <div className='profile-controls row'>
        <div className='col m12'>
          {controlButtons}
        </div>
      </div>
    )
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
    const { editingEnabled, toggleEditMode, updateEmployee } = this.props

    return (
      <div>
        {this._renderControls(editingEnabled, toggleEditMode, updateEmployee)}
        <div className='row'>
          { this._renderEmployeeDetails(editingEnabled, employee) }
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

EmployeeProfile.propTypes = {
  params: PropTypes.shape({
    employeeId: PropTypes.string.isRequired
  }),
  selectEmployee: PropTypes.func.isRequired,
  updateEmployee: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  selectedEmployeeId: PropTypes.string,
  employee: PropTypes.shape(Employee),
  hasLoaded: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  error: PropTypes.string,
  editingEnabled: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => ({
  selectedEmployeeId : getSelectedEmployeeId(state),
  employee: selectEmployeeProfileFromState(state),
  hasLoaded: employeeProfileHasLoaded(state),
  hasError: employeeProfileHasError(state),
  error: employeeProfileError(state),
  editingEnabled: employeeEditModeIsEnabled(state)
})

const mapDispatchToProps = (dispatch) => ({
  selectEmployee: (employeeId) => dispatch(selectEmployee(employeeId)),
  toggleEditMode: (employeeId) => dispatch(employeeEditModeToggled()),
  updateEmployee: (updatedEmployee) => dispatch(updateEmployee())
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProfile)
