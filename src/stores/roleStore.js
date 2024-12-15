import { assignPermission, getRole, getRoles, syncPermission } from '@/api/role'
import { defineStore } from 'pinia'

export const useRoleStore = defineStore('roleStore', {
  state: () => ({
    roles: [],
    role: {},
  }),

  actions: {
    // get all roles
    getRoles(query) {
      return new Promise((resolve, reject) => {
        getRoles(query)
          .then(response => {
            this.roles = response.data.data
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    syncPermission(query) {
      return new Promise((resolve, reject) => {
        syncPermission(query)
          .then(response => {
            this.roles = response.data.data
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // get a role by id with its permissions
    getRole(id) {
      return new Promise((resolve, reject) => {
        getRole(id)
          .then(response => {
            this.role = response.data.data
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // assign a permission to a role
    assignPermission(data) {
      return new Promise((resolve, reject) => {
        assignPermission(data)
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
