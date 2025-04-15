import { createService, deleteService, editService, getDescription, getService, updateDescription, updateService } from '@/api/toruism/service'
import { defineStore } from 'pinia'

export const useServiceStore = defineStore('serviceStore', {
  actions: {     
    getService(query) {
      return new Promise((resolve, reject) => {
        getService(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getDescription(query) {
      return new Promise((resolve, reject) => {
        getDescription(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
   

    // editAwareness

    editService(query) {
      return new Promise((resolve, reject) => {
        editService(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateService(data) {
      return new Promise((resolve, reject) => {
        updateService(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateDescription(data) {
      return new Promise((resolve, reject) => {
        updateDescription(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createService(data) {
      return new Promise((resolve, reject) => {
        createService(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteService(data) {
      return new Promise((resolve, reject) => {
        deleteService(data)
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



 
