import React, { PropTypes } from 'react'

const KeySkills = ({ keySkills }) => (
  <div>
    <h5>Key Skills</h5>
    <ul className='collection'>
      {keySkills.map((project) => (
        <li key={project.name} className='collection-item'>{project.name}</li>
      ))}
    </ul>
  </div>
)

KeySkills.propTypes = {
  keySkills: PropTypes.array.isRequired
}

export default KeySkills
