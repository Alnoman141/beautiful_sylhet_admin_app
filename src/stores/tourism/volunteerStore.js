import { createVolunteer, deleteVolunteer, editVolunteer, getVolunteer, updateVolunteer } from '@/api/toruism/volunteer'
import { defineStore } from 'pinia'

export const useVolunteerStore = defineStore('volunteerStore', {
  actions: {     
    getVolunteer(query) {
      return new Promise((resolve, reject) => {
        getVolunteer(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    // editAwareness

    editVolunteer(query) {
      return new Promise((resolve, reject) => {
        editVolunteer(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateVolunteer(data) {
      return new Promise((resolve, reject) => {
        updateVolunteer(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createVolunteer(data) {
      return new Promise((resolve, reject) => {
        createVolunteer(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteVolunteer(data) {
      return new Promise((resolve, reject) => {
        deleteVolunteer(data)
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



 
