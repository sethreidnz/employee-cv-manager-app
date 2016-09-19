import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import CoreLayout from '../layouts/CoreLayout/CoreLayout'

import EmployeeDashboard from 'routes/Home'
import EmployeeProfile from 'routes/EmployeeProfile'

const Routes = ({ history }) => (
  <Router history={history}>
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={EmployeeDashboard} />
      <Route path='/employee/:employeeId' component={EmployeeProfile} />
    </Route>
  </Router>
)

Routes.propTypes = {
  history: PropTypes.object.isRequired
}

export default Routes
