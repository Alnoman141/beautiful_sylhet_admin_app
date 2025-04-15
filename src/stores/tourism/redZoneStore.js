import { createRedZone, deleteRedZone, editRedZone, getRedZone, updateRedZone } from '@/api/toruism/redZone'
import { defineStore } from 'pinia'

export const useRedZoneStore = defineStore('redZoneStore', {
  actions: {     
    getRedZone(query) {
      return new Promise((resolve, reject) => {
        getRedZone(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    // editAwareness

    editRedZone(query) {
      return new Promise((resolve, reject) => {
        editRedZone(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateRedZone(data) {
      return new Promise((resolve, reject) => {
        updateRedZone(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createRedZone(data) {
      return new Promise((resolve, reject) => {
        createRedZone(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteRedZone(data) {
      return new Promise((resolve, reject) => {
        deleteRedZone(data)
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



 
