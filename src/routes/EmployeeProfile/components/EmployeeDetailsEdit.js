import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import { EMPLOYEE_PROFILE_FORM_NAME } from 'constants/formContants'

const EmployeeDetailsEdit = ({
  handleSubmit,
  toggleEditMode,
  avatarUrl,
  fields: { firstName, lastName, role, team, biography }
}) => (
  <form id={EMPLOYEE_PROFILE_FORM_NAME} onSubmit={handleSubmit} className='row employee-details-edit'>
    <div className='profile'>
      <div className='col s12 m4'>
        <div className='col s12 m6 profile-picture'>
          <img src={avatarUrl} alt='' />
        </div>
        <div className='col s12 m6 profile-details'>
          <label>First Name</label>
          <input name='firstName' component='input' type='text' placeholder='First Name' {...firstName} />
          <label>Last Name</label>
          <input name='lastName' component='input' type='text' placeholder='Last Name' {...lastName} />
          <label>Role</label>
          <input name='role' component='input' type='text' placeholder='Role' {...role} />
          <label>Team</label>
          <input name='team' component='input' type='text' placeholder='Team' {...team} />
        </div>
      </div>
      <div className='col s12 m8'>
        <h5>Biography</h5>
        <input name='biography' component='input' type='textarea' placeholder='Biography' {...biography} />
      </div>
    </div>
    <div className='row'>
      <div className='col s12 m12'>
        <button type='submit' className='btn'>Save</button>
        <a onClick={toggleEditMode} className='btn waves-effect waves-light btn'>Edit</a>
      </div>
    </div>
  </form>
)

EmployeeDetailsEdit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    role: PropTypes.string,
    team: PropTypes.string,
    biography: PropTypes.string
  }),
  avatarUrl: PropTypes.string.isRequired,
  initialValues: PropTypes.object
}

export default reduxForm({
  form: EMPLOYEE_PROFILE_FORM_NAME,
  fields: ['firstName', 'lastName', 'role', 'team', 'biography']
})(EmployeeDetailsEdit)
