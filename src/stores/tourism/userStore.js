import { createUser, deleteUser, editUser, getUser, updateUser } from '@/api/toruism/user'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  actions: {     
    getUser(query) {
      return new Promise((resolve, reject) => {
        getUser(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    // editAwareness

    editUser(query) {
      return new Promise((resolve, reject) => {
        editUser(query)
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateUser(data) {
      return new Promise((resolve, reject) => {
        updateUser(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createUser(data) {
      return new Promise((resolve, reject) => {
        createUser(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteUser(data) {
      return new Promise((resolve, reject) => {
        deleteUser(data)
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



 
