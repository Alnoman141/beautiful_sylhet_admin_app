import { defineStore } from 'pinia'
import { getJobRoles, createJobRole, updateJobRole } from '@/api/jobRole'

export const useJobRoleStore = defineStore('jobRoleStore', {
  state: () => ({
    jobRoles: [],
    jobRole: {},
  }),

  actions: {
    // get all job roles
    getJobRoles(query) {
      return new Promise((resolve, reject) => {
        getJobRoles(query)
          .then(response => {
            this.jobRoles = response.data.data
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // create a job role
    createJobRole(data) {
      return new Promise((resolve, reject) => {
        createJobRole(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // update a job role
    updateJobRole(data) {
      return new Promise((resolve, reject) => {
        updateJobRole(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
})
