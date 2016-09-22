import fetch from 'isomorphic-fetch'
require('es6-promise').polyfill()

export const getEmployees = () => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:5000/api/employee', {
      credentials: 'include'
    })
    .then((response) => {
      if (response.status >= 400) {
        reject('Bad response from server')
      }
      return response.json()
    })
    .then((employeesSimplifiedDataList) => {
      resolve(employeesSimplifiedDataList)
    })
  })
}

export const getEmployee = (employeeId) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/api/employee/${employeeId}`, {
      credentials: 'include'
    })
    .then((response) => {
      if (response.status >= 400) {
        reject('Bad response from server')
      }
      return response.json()
    })
    .then((employee) => {
      resolve(employee)
    })
  })
}

export const putEmployee = (updatedEmployee) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/api/employee/${updatedEmployee.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedEmployee)
    })
    .then((response) => {
      if (response.status >= 400) {
        reject('Bad response from server')
      } else {
        resolve(updatedEmployee.id)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  })
}
