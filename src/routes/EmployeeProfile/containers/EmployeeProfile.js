import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// PropTypes
import { Employee } from 'constants/PropTypes'

// Components
import Spinner from 'components/Spinner'
import Error from 'components/Error'
import { EmployeeDetails, KeySkills, RecentProjects } from '../components'

// Actions and Selectors
import {
  selectEmployee,
  selectEmployeeProfileFromState,
  getSelectedEmployeeId,
  employeeProfileHasError,
  employeeProfileHasLoaded,
  employeeProfileError
} from '../modules/employeeProfiles'

class EmployeeProfile extends Component {
  componentWillMount () {
    const { selectEmployee, selectedEmployeeId, params: { employeeId } } = this.props
    if (!selectedEmployeeId || selectedEmployeeId !== employeeId) {
      selectEmployee(employeeId)
    }
  }
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
    return (
      <div>
        <div className='row'>
          <EmployeeDetails
            firstName={firstName}
            lastName={lastName}
            role={role}
            biography={biography}
            team={team}
            avatarUrl={avatar} />
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
  selectedEmployeeId: PropTypes.string,
  employee: PropTypes.shape(Employee),
  hasLoaded: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  error: PropTypes.string
}

const mapStateToProps = (state, ownProps) => ({
  selectedEmployeeId : getSelectedEmployeeId(state),
  employee: selectEmployeeProfileFromState(state),
  hasLoaded: employeeProfileHasLoaded(state),
  hasError: employeeProfileHasError(state),
  error: employeeProfileError(state)
})

const mapDispatchToProps = (dispatch) => ({
  selectEmployee: (employeeId) => dispatch(selectEmployee(employeeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProfile)
