import { changeStatus, editComplain, getComplainList, replyComplain, submitComplain } from '@/api/toruism/complain'
import { defineStore } from 'pinia'

export const useComplainStore = defineStore('complainStore', {
  actions: {     
    
    getComplainList(query) {
      return new Promise((resolve, reject) => {
        getComplainList(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    submitComplain(data) {
      return new Promise((resolve, reject) => {
        submitComplain(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    replyComplain(data) {
      return new Promise((resolve, reject) => {
        replyComplain(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    editComplain(query) {
      return new Promise((resolve, reject) => {
        editComplain(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // changeStatus
    changeStatus(query) {
      return new Promise((resolve, reject) => {
        changeStatus(query)
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



 
