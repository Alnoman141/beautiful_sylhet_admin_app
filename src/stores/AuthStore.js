import { getUserPermissions, login, logout, resetPassword, updatePassword } from '@/api/auth'
import { getDummyPermissions } from '@/api/toruism/dummy'
import { getToken, getUserData } from '@/utils/auth'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('AuthStore', {
  state: () => ({
    user: getUserData() || null,
    token: getToken() || null,
    permissions: [],
    // eslint-disable-next-line camelcase
    // api_domain: getApiDomain() || null,
  }),
  actions: {
    // user login
    login(data) {      
      return new Promise((resolve, reject) => {
        login(data)
          .then(response => {
            const { data } = response
            const { dummyData } =  getDummyPermissions()

            

            this.token = data.token
            this.user = data.user

            this.permissions = dummyData
            // eslint-disable-next-line camelcase
            // this.api_domain = data.api_domain
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // get user permissions
    getUserPermissions() {
      return new Promise( async(resolve, reject) => {
        await getUserPermissions()
          .then(response => {
            this.permissions = response.data.data
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // reset password
    resetPassword(data) {
      return new Promise((resolve, reject) => {
        resetPassword(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    

    updatePassword(data) {
      return new Promise((resolve, reject) => {
        updatePassword(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // user logout
    logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            this.token = null
            this.user = null
            this.permissions = []
            // eslint-disable-next-line camelcase
            // this.api_domain = null
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },
})
