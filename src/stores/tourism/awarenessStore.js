import { createAwareness, editAwareness, getAwareness, getAwarenessById, updateAwareness } from '@/api/toruism/awareness'
import { defineStore } from 'pinia'

export const useAwarenessStore = defineStore('awarenessStore', {
  actions: {     
    getAwareness(query) {
      return new Promise((resolve, reject) => {
        getAwareness(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // editAwareness

    editAwareness(query) {
      return new Promise((resolve, reject) => {
        editAwareness(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateAwareness(data) {
      return new Promise((resolve, reject) => {
        updateAwareness(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getAwarenessById(id) {
      return new Promise((resolve, reject) => {
        getAwarenessById(id)
          .then(response => {
            this.location = response.data.data
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },

    createAwareness(data) {
      return new Promise((resolve, reject) => {
        createAwareness(data)
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



 
