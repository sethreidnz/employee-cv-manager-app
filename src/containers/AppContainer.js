import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'

import Routes from 'routes/index'

class AppContainer extends Component {
  static propTypes = {
    history : PropTypes.object.isRequired,
    store   : PropTypes.object.isRequired
  }

  render () {
    const { history, store } = this.props
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Routes history={history} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
