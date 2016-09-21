import React, { PropTypes } from 'react'

const EmployeeDetails = ({ firstName, lastName, role, team, biography, avatarUrl, toggleEditMode }) => (
  <div className='row'>
    <div className='profile row'>
      <div className='col s12 m4'>
        <div className='col s12 m6 profile-picture'>
          <img src={avatarUrl} alt='' />
        </div>
        <div className='col s12 m6 profile-details'>
          <h5 className='profile-name'>{firstName} {lastName}</h5>
          <label>Role</label>
          <span className='profile-role'>{role}</span>
          <label>Team</label>
          <span className='profile-team'>{team}</span>
        </div>
      </div>
      <div className='col s12 m8'>
        <h5>Biography</h5>
        <p>
          {biography}
        </p>
      </div>
    </div>
    <div className='row'>
      <div className='col s12 m12'>
        <a onClick={toggleEditMode} className='btn waves-effect waves-light btn'>Edit</a>
      </div>
    </div>
  </div>
)

EmployeeDetails.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  biography: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  toggleEditMode: PropTypes.func.isRequired
}

export default EmployeeDetails
