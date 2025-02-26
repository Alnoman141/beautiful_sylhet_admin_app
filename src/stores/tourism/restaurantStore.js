import { createRestaurant, deleteRestaurant, editRestaurant, getRestaurant, updateRestaurant } from '@/api/toruism/restaurant'
import { defineStore } from 'pinia'

export const useRestaurantStore = defineStore('RestaurantStore', {
  actions: {     
    getRestaurant(query) {
      return new Promise((resolve, reject) => {
        getRestaurant(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    // editAwareness

    editRestaurant(query) {
      return new Promise((resolve, reject) => {
        editRestaurant(query)
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateRestaurant(data) {
      return new Promise((resolve, reject) => {
        updateRestaurant(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createRestaurant(data) {
      return new Promise((resolve, reject) => {
        createRestaurant(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteRestaurant(data) {
      return new Promise((resolve, reject) => {
        deleteRestaurant(data)
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



 
