import { getDashboard } from '@/api/toruism/dashboard'
import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboardStore', {
  actions: {
    getDashboard(query) {
      return new Promise((resolve, reject) => {
        getDashboard(query)
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
