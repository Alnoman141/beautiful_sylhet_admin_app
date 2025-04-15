import { createAtm, deleteAtm, editAtm, getAtm, updateAtm } from '@/api/toruism/atm'
import { defineStore } from 'pinia'

export const useAtmStore = defineStore('atmStore', {
  actions: {     
    getAtm(query) {
      return new Promise((resolve, reject) => {
        getAtm(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    // editAwareness

    editAtm(query) {
      return new Promise((resolve, reject) => {
        editAtm(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateAtm(data) {
      return new Promise((resolve, reject) => {
        updateAtm(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createAtm(data) {
      return new Promise((resolve, reject) => {
        createAtm(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteAtm(data) {
      return new Promise((resolve, reject) => {
        deleteAtm(data)
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



 
