import { createHotelType, deleteHotelType, editHotelType, getHotelType, getHotelTypeDropdown, updateHotelType } from '@/api/toruism/hotelType'
import { defineStore } from 'pinia'

export const useHotelTypeStore = defineStore('hotelTypeStore', {
  actions: {     
    getHotelType(query) {
      return new Promise((resolve, reject) => {
        getHotelType(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getHotelTypeDropdown(query) {
      return new Promise((resolve, reject) => {
        getHotelTypeDropdown(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
   
    createHotelType(data) {
      return new Promise((resolve, reject) => {
        createHotelType(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // editAwareness

    editHotelType(query) {
      return new Promise((resolve, reject) => {
        editHotelType(query)
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateHotelType(data) {
      return new Promise((resolve, reject) => {
        updateHotelType(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

   

    deleteHotelType(data) {
      return new Promise((resolve, reject) => {
        deleteHotelType(data)
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



 
