import { createGuard, deleteGuard, editGuard, getGuard, updateGuard } from '@/api/toruism/guard'
import { defineStore } from 'pinia'

export const useGuardStore = defineStore('guardStore', {
  actions: {     
    getGuard(query) {
      return new Promise((resolve, reject) => {
        getGuard(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    // editAwareness

    editGuard(query) {
      return new Promise((resolve, reject) => {
        editGuard(query)
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateGuard(data) {
      return new Promise((resolve, reject) => {
        updateGuard(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createGuard(data) {
      return new Promise((resolve, reject) => {
        createGuard(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteGuard(data) {
      return new Promise((resolve, reject) => {
        deleteGuard(data)
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



 
