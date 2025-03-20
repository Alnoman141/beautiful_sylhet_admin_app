import { createComplainCategory, deleteComplainCategory, editComplainCategory, getComplainCategory, updateComplainCategory } from '@/api/toruism/complainCategory'
import { defineStore } from 'pinia'

export const useComplainCategoryStore = defineStore('ComplainCategoryStore', {
  actions: {     
    

    
    getComplainCategory(query) {
      return new Promise((resolve, reject) => {
        getComplainCategory(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // editAwareness

    editComplainCategory(query) {
      return new Promise((resolve, reject) => {
        editComplainCategory(query)
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateComplainCategory(data) {
      return new Promise((resolve, reject) => {
        updateComplainCategory(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    createComplainCategory(data) {
      return new Promise((resolve, reject) => {
        createComplainCategory(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteComplainCategory(data) {
      return new Promise((resolve, reject) => {
        deleteComplainCategory(data)
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



 
