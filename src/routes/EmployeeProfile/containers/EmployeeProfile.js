import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// PropTypes
import { Employee } from 'constants/PropTypes'

// Components
import Spinner from 'components/Spinner'
import Error from 'components/Error'

// Actions
import { requestEmployee } from '../modules/employeeProfile'

class EmployeeProfile extends Component {
  componentWillMount () {
    const { selectEmployee, params: { employeeId } } = this.props
    selectEmployee(employeeId)
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
        <div className='col s12 m4'>
          <div className='row'>
            <div className='profile'>
              <div className='col s12 m6 profile-picture'>
                <img src={avatar} alt='' />
              </div>
              <div className='col s12 m6 profile-details'>
                <h5 className='profile-name'>{firstName} {lastName}</h5>
                <label>Role</label>
                <span className='profile-role'>{role}</span>
                <label>Team</label>
                <span className='profile-team'>{team}</span>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='profile'>
              <div className='col s12 m12 profile-details'>
                <h5 className='profile-name'>Key Skills and Technologies</h5>
                <ul className='collection'>
                    {keySkills.map((skill) => (
                      <li key={skill.name} className='collection-item'>{skill.name}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='col s12 m8'>
          <h5>Biography</h5>
          <p>
            {biography}
          </p>
          <h5>Recent Projects</h5>
          <ul className='collection'>
            {recentProjects.map((project) => (
              <li key={project.name} className='collection-item'>{project.name}</li>
            ))}
          </ul>
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
  employeeId: PropTypes.string.isRequired,
  employee: PropTypes.shape(Employee),
  hasLoaded: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  error: PropTypes.string
}

const mapStateToProps = (state, ownProps) => ({
  employeeId : ownProps.params.employeeId,
  employee: state.employeeProfile.item,
  hasLoaded: state.employeeProfile.hasLoaded,
  hasError: state.employeeProfile.hasError,
  error: state.employeeProfile.error
})

const mapDispatchToProps = (dispatch) => ({
  selectEmployee: (employeeId) => dispatch(requestEmployee(employeeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProfile)
