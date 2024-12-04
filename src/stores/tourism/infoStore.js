import { createInfo, editInfo, getInfoDetail } from '@/api/toruism/info'
import { defineStore } from 'pinia'

export const useInfoStore = defineStore('infoStore', {
  actions: {     
   

    // editInfo

    getInfoDetail(query) {
      return new Promise((resolve, reject) => {
        getInfoDetail(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    createInfo(data) {
      return new Promise((resolve, reject) => {
        createInfo(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    editInfo(data) {
      return new Promise((resolve, reject) => {
        editInfo(data)
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



 
