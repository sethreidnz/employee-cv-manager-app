import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import EmployeeDashboard from './Home'
import EmployeeProfile from './EmployeeProfile'

const Routes = ({ store }) => (
  <Router>
    <Route path='/'>
      <IndexRoute component={EmployeeDashboard} />
      <Route path='/dashboard' component={EmployeeDashboard} />
      <Route path='/employee/:employeeId' component={EmployeeProfile} />
    </Route>
  </Router>
)

Routes.propTypes = {
  store: PropTypes.object.isRequired
}

export default Routes
