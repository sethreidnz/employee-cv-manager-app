import React, { PropTypes } from 'react'

const RecentProjects = ({ recentProjects }) => (
  <div>
    <h5>Recent Projects</h5>
    <ul className='collection'>
      {recentProjects.map((project) => (
        <li key={project.name} className='collection-item'>{project.name}</li>
      ))}
    </ul>
  </div>
)

RecentProjects.propTypes = {
  recentProjects: PropTypes.array.isRequired
}

export default RecentProjects
