import { createTransport, deleteTransport, editTransport, getTransport, getTransportType, updateTransport } from '@/api/toruism/transport'
import { defineStore } from 'pinia'

export const useTransportStore = defineStore('transportStore', {
  actions: {     
    getTransport(query) {
      return new Promise((resolve, reject) => {
        getTransport(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getTransportType(query) {
      return new Promise((resolve, reject) => {
        getTransportType(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getTransportType(query) {
      return new Promise((resolve, reject) => {
        getTransportType(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // editAwareness

    editTransport(query) {
      return new Promise((resolve, reject) => {
        editTransport(query)
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateTransport(data) {
      return new Promise((resolve, reject) => {
        updateTransport(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createTransport(data) {
      return new Promise((resolve, reject) => {
        createTransport(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteTransport(data) {
      return new Promise((resolve, reject) => {
        deleteTransport(data)
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



 
