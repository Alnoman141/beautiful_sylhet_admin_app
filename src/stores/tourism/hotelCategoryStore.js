import { createHotelCategory, deleteHotelCategory, editHotelCategory, getHotelCategory, getHotelCategoryDropdown, updateHotelCategory } from '@/api/toruism/hotelCategory'
import { defineStore } from 'pinia'

export const useHotelCategoryStore = defineStore('hotelCategoryStore', {
  actions: {     
    getHotelCategory(query) {
      return new Promise((resolve, reject) => {
        getHotelCategory(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // getHotelCategoryDropdown

    getHotelCategoryDropdown(query) {
      return new Promise((resolve, reject) => {
        getHotelCategoryDropdown(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
   
    createHotelCategory(data) {
      return new Promise((resolve, reject) => {
        createHotelCategory(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    

    // editAwareness

    editHotelCategory(query) {
      return new Promise((resolve, reject) => {
        editHotelCategory(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateHotelCategory(data) {
      return new Promise((resolve, reject) => {
        updateHotelCategory(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

   

    deleteHotelCategory(data) {
      return new Promise((resolve, reject) => {
        deleteHotelCategory(data)
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



 
