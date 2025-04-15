import { createLocker, deleteLocker, editLocker, getLocker, publishLocker, updateLocker } from '@/api/toruism/locker'
import { defineStore } from 'pinia'

export const useLockerStore = defineStore('lockerStore', {
  actions: {     
    getLocker(query) {
      return new Promise((resolve, reject) => {
        getLocker(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getLockerType(query) {
      return new Promise((resolve, reject) => {
        getLockerType(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // editAwareness

    editLocker(query) {
      return new Promise((resolve, reject) => {
        editLocker(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateLocker(data) {
      return new Promise((resolve, reject) => {
        updateLocker(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createLocker(data) {
      return new Promise((resolve, reject) => {
        createLocker(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteLocker(data) {
      return new Promise((resolve, reject) => {
        deleteLocker(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // publishLocker

    publishLocker(data) {
      return new Promise((resolve, reject) => {
        publishLocker(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getLockerById(id) {
      return new Promise((resolve, reject) => {
        getLockerById(id)
          .then(response => {
            this.location = response.data.data
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
  },
})



 
