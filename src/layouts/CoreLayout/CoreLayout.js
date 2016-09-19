import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = (props) => {
  return (
    <div>
      <Header />
      <div className='container'>
        <div className='row'>
          <div className='  main-content'>
            {props.children}
          </div>
        </div>
      </div>
    </div>
)
}

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
