import { createEvents, deleteEvents, editEvents, getEvents, updateEvents } from '@/api/toruism/events'
import { defineStore } from 'pinia'

export const useEventsStore = defineStore('eventsStore', {
  actions: {     
    getEvents(query) {
      return new Promise((resolve, reject) => {
        getEvents(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getEventsType(query) {
      return new Promise((resolve, reject) => {
        getEventsType(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // editAwareness

    editEvents(query) {
      return new Promise((resolve, reject) => {
        editEvents(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateEvents(data) {
      return new Promise((resolve, reject) => {
        updateEvents(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createEvents(data) {
      return new Promise((resolve, reject) => {
        createEvents(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteEvents(data) {
      return new Promise((resolve, reject) => {
        deleteEvents(data)
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



 
