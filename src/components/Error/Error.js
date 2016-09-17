import React, { PropTypes } from 'react'

const Error = ({ error }) => (
  <div className='error center-align'>
    <p>Sorry something went wrong...</p>
    <img src='/src/images/error.png' role='presentation' />
    <p>{error}</p>
  </div>
)

Error.propTypes = {
  error: PropTypes.string
}

export default Error
