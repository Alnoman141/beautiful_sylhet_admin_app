import { editGuideline, getGuideline, getGuidelineById, updateGuideline } from '@/api/toruism/guideline'
import { defineStore } from 'pinia'

export const useGuidelineStore = defineStore('guidelineStore', {
  actions: {     
    getGuideline(query) {
      return new Promise((resolve, reject) => {
        getGuideline(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // editGuideline

    editGuideline(query) {
      return new Promise((resolve, reject) => {
        editGuideline(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateGuideline(data) {
      return new Promise((resolve, reject) => {
        updateGuideline(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getGuidelineById(id) {
      return new Promise((resolve, reject) => {
        getGuidelineById(id)
          .then(response => {
            this.location = response.data.data
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
  },
})



 
