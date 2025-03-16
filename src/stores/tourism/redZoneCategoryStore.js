import { createRedZoneCategory, deleteRedZoneCategory, editRedZoneCategory, getRedZoneCategory, updateRedZoneCategory } from '@/api/toruism/redZoneCategory'
import { defineStore } from 'pinia'

export const useRedZoneCategoryStore = defineStore('redZoneCategoryStore', {
  actions: {     
    getRedZoneCategory(query) {
      return new Promise((resolve, reject) => {
        getRedZoneCategory(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    // editAwareness

    editRedZoneCategory(query) {
      return new Promise((resolve, reject) => {
        editRedZoneCategory(query)
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateRedZoneCategory(data) {
      return new Promise((resolve, reject) => {
        updateRedZoneCategory(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createRedZoneCategory(data) {
      return new Promise((resolve, reject) => {
        createRedZoneCategory(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteRedZoneCategory(data) {
      return new Promise((resolve, reject) => {
        deleteRedZoneCategory(data)
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



 
