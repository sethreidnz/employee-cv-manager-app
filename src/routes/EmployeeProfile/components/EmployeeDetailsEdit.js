import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'

import { EMPLOYEE_PROFILE_FORM_NAME } from 'constants/formContants'

const EmployeeDetailsEdit = ({
  handleSubmit,
  toggleEditMode,
  firstName,
  lastName,
  role,
  team,
  biography,
  avatarUrl,
  initialValues
}) => (
  <form id={EMPLOYEE_PROFILE_FORM_NAME} onSubmit={handleSubmit} className='row'>
    <div>
      <button onClick={handleSubmit} className='btn'>Save</button>
      <a onClick={toggleEditMode} className='btn'>Cancel</a>
    </div>
    <div className='profile'>
      <div className='col s12 m4'>
        <div className='col s12 m6 profile-picture'>
          <img src={avatarUrl} alt='' />
        </div>
        <div className='col s12 m6 profile-details'>
          <label>First Name</label>
          <Field name='firstName' component='input' type='text' placeholder='First Name' />
          <label>Last Name</label>
          <Field name='lastName' component='input' type='text' placeholder='Last Name' />
          <label>Role</label>
          <Field name='role' component='input' type='text' placeholder='Role' />
          <label>Team</label>
          <Field name='team' component='input' type='text' placeholder='Team' />
        </div>
      </div>
    </div>
    <div className='col s12 m8'>
      <h5>Biography</h5>
      <Field name='biography' component='input' type='textarea' placeholder='Biography' />
    </div>
  </form>
)

EmployeeDetailsEdit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  biography: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  initialValues: PropTypes.object
}

export default reduxForm({
  form: EMPLOYEE_PROFILE_FORM_NAME
})(EmployeeDetailsEdit)
