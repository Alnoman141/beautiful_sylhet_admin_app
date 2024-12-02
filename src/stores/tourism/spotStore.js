import { createSpot, deleteImage, deleteSpot, editSpot, getSpot, getSpotDropdown, updateSpot } from '@/api/toruism/spot'
import { defineStore } from 'pinia'

export const useSpotStore = defineStore('spotStore', {
  actions: {     
    getSpot(query) {
      return new Promise((resolve, reject) => {
        getSpot(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // getSpotDropdown
    getSpotDropdown(query) {
      return new Promise((resolve, reject) => {
        getSpotDropdown(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // editAwareness

    editSpot(query) {
      return new Promise((resolve, reject) => {
        editSpot(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateSpot(data) {
      return new Promise((resolve, reject) => {
        updateSpot(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createSpot(data) {
      return new Promise((resolve, reject) => {
        createSpot(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // deleteSpot
    deleteSpot(data) {
      return new Promise((resolve, reject) => {
        deleteSpot(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteImage(data) {
      return new Promise((resolve, reject) => {
        deleteImage(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getSpotById(id) {
      return new Promise((resolve, reject) => {
        getSpotById(id)
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



 
