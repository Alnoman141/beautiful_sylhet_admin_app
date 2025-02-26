import { createFair, deleteFair, editFair, getFair, updateFair } from '@/api/toruism/fair'
import { defineStore } from 'pinia'

export const useFairStore = defineStore('fairStore', {
  actions: {     
    getFair(query) {
      return new Promise((resolve, reject) => {
        getFair(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    // editAwareness

    editFair(query) {
      return new Promise((resolve, reject) => {
        editFair(query)
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateFair(data) {
      return new Promise((resolve, reject) => {
        updateFair(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createFair(data) {
      return new Promise((resolve, reject) => {
        createFair(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteFair(data) {
      return new Promise((resolve, reject) => {
        deleteFair(data)
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



 
