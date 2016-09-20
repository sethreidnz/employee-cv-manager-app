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
  _renderEmployeeDetails = (editModeEnabled, firstName, lastName, role, team, biography, avatar) => {
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
    return (
      <EmployeeDetailsEdit
        firstName={firstName}
        lastName={lastName}
        role={role}
        biography={biography}
        team={team}
        avatarUrl={avatar} />
    )
  }
  _renderSecondaryContent = ({ keySkills, recentProjects }) => (
    <div className='row'>
      <div className='col s12 m6'>
        <KeySkills keySkills={keySkills} />
      </div>
      <div className='col s12 m6'>
        <RecentProjects recentProjects={recentProjects} />
      </div>
    </div>
  )
  render () {
    const { hasLoaded } = this.props
    if (!hasLoaded) {
      return <Spinner />
    }

    const { hasError, error } = this.props
    if (hasError) {
      return <Error error={error} />
    }

    // deconstruct the employee object for easier rendering
    const { employee: { firstName, lastName, role, team, biography, avatar, keySkills, recentProjects } } = this.props
    const { editingEnabled, toggleEditMode } = this.props

    return (
      <div>
        <div className='profile-controls row'>
          <div className='col m12'>
            <a onClick={toggleEditMode} className='btn'>Edit</a>
          </div>
        </div>
        <div className='row'>
          { this._renderEmployeeDetails(editingEnabled, firstName, lastName, role, team, biography, avatar) }
        </div>
        <div className='row'>
          <div className='col s12 m6'>
            <KeySkills keySkills={keySkills} />
          </div>
          <div className='col s12 m6'>
            <RecentProjects recentProjects={recentProjects} />
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
  toggleEditMode: (employeeId) => dispatch(employeeEditModeToggled())
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProfile)
