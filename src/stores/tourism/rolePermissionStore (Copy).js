import { getRole, getSingleRole, rolePermissionAssign, selfRolePermission } from '@/api/toruism/rolePermission'
import { defineStore } from 'pinia'

export const useRolePermissionStore = defineStore('rolePermissionStore', {
  actions: {     
    getSingleRole(query) {
      return new Promise((resolve, reject) => {
        getSingleRole(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    // editAwareness

    selfRolePermission(query) {
      return new Promise((resolve, reject) => {
        selfRolePermission(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    rolePermissionAssign(data) {
      return new Promise((resolve, reject) => {
        rolePermissionAssign(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    getRole(data) {
      return new Promise((resolve, reject) => {
        getRole(data)
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



 
