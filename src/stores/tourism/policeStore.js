import { createPolice, deletePolice, editPolice, getPolice, updatePolice } from '@/api/toruism/police'
import { defineStore } from 'pinia'

export const usePoliceStore = defineStore('policeStore', {
  actions: {     
    getPolice(query) {
      return new Promise((resolve, reject) => {
        getPolice(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    // editAwareness

    editPolice(query) {
      return new Promise((resolve, reject) => {
        editPolice(query)
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updatePolice(data) {
      return new Promise((resolve, reject) => {
        updatePolice(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createPolice(data) {
      return new Promise((resolve, reject) => {
        createPolice(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deletePolice(data) {
      return new Promise((resolve, reject) => {
        deletePolice(data)
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



 
