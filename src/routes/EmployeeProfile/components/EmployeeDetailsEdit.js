import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import { EMPLOYEE_PROFILE_FORM_NAME } from 'constants/formContants'

const EmployeeDetailsEdit = ({ handleSubmit, firstName, lastName, role, team, biography, avatarUrl }) => (
  <form onSubmit={handleSubmit} className='row'>
    <div className='profile'>
      <div className='col s12 m4'>
        <div className='col s12 m6 profile-picture'>
          <img src={avatarUrl} alt='' />
        </div>
        <div className='col s12 m6 profile-details'>
          <h5 className='profile-name'>{firstName} {lastName}</h5>
          <label>Role</label>
          edit
          <label>Team</label>
          edit
          <label htmlFor='lastName'>Team</label>
          edit
        </div>
      </div>
    </div>
    <div className='col s12 m8'>
      <h5>Biography</h5>
      <p>
        edit
      </p>
    </div>
  </form>
)

EmployeeDetailsEdit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  biography: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired
}

export default reduxForm({
  form: EMPLOYEE_PROFILE_FORM_NAME
})(EmployeeDetailsEdit)
