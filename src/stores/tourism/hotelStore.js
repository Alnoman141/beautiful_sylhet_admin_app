import { createHotel, deleteHotel, editHotel, getHotel, publishHotel, updateHotel } from '@/api/toruism/hotel'
import { defineStore } from 'pinia'

export const useHotelStore = defineStore('hotelStore', {
  actions: {     
    getHotel(query) {
      return new Promise((resolve, reject) => {
        getHotel(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
   

    // editAwareness

    editHotel(query) {
      return new Promise((resolve, reject) => {
        editHotel(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateHotel(data) {
      return new Promise((resolve, reject) => {
        updateHotel(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createHotel(data) {
      return new Promise((resolve, reject) => {
        createHotel(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteHotel(data) {
      return new Promise((resolve, reject) => {
        deleteHotel(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // publishHotel

    publishHotel(data) {
      return new Promise((resolve, reject) => {
        publishHotel(data)
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



 
