import { createRestaurantCategory, deleteRestaurantCategory, editRestaurantCategory, getRestaurantCategory, getRestaurantCategoryDropdown, updateRestaurantCategory } from '@/api/toruism/restaurantCategory'
import { defineStore } from 'pinia'

export const useRestaurantCategoryStore = defineStore('RestaurantCategoryStore', {
  actions: {     
    getRestaurantCategory(query) {
      return new Promise((resolve, reject) => {
        getRestaurantCategory(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // getRestaurantCategoryDropdown

    getRestaurantCategoryDropdown(query) {
      return new Promise((resolve, reject) => {
        getRestaurantCategoryDropdown(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
   
    createRestaurantCategory(data) {
      return new Promise((resolve, reject) => {
        createRestaurantCategory(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    

    // editAwareness

    editRestaurantCategory(query) {
      return new Promise((resolve, reject) => {
        editRestaurantCategory(query)
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateRestaurantCategory(data) {
      return new Promise((resolve, reject) => {
        updateRestaurantCategory(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

   

    deleteRestaurantCategory(data) {
      return new Promise((resolve, reject) => {
        deleteRestaurantCategory(data)
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



 
