import React, { PropTypes } from 'react'

// PropTypes
import { EmployeeSimlified } from 'constants/PropTypes'

const EmployeeList = ({ children }) => (
  <div className='employee-list'>
    <h3>Current Employees</h3>
    <ul className='collection'>
            {children}
    </ul>
  </div>
)

EmployeeList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape(EmployeeSimlified))
}

export default EmployeeList
