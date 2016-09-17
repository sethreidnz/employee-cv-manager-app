import { PropTypes } from 'react'
export const Employee = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  biography: PropTypes.string.isRequired,
  keySkills: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })),
  recentProjects: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  }))
}

export const EmployeeSimlified = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired
}
