import { createLandingPage, deleteLandingPage, editLandingPage, getLandingPage, updateLandingPage } from '@/api/toruism/landingPage'
import { defineStore } from 'pinia'

export const useLandingPageStore = defineStore('landingPageStore', {
  actions: {     
    getLandingPage(query) {
      return new Promise((resolve, reject) => {
        getLandingPage(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    // editAwareness

    editLandingPage(query) {
      return new Promise((resolve, reject) => {
        editLandingPage(query)
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateLandingPage(data) {
      return new Promise((resolve, reject) => {
        updateLandingPage(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createLandingPage(data) {
      return new Promise((resolve, reject) => {
        createLandingPage(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteLandingPage(data) {
      return new Promise((resolve, reject) => {
        deleteLandingPage(data)
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



 
