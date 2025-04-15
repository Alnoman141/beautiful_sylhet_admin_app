import { createBank, deleteBank, editBank, getBank, getBankDropdown, updateBank } from '@/api/toruism/bank'
import { defineStore } from 'pinia'

export const useBankStore = defineStore('bankStore', {
  actions: {     
    getBank(query) {
      return new Promise((resolve, reject) => {
        getBank(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getBankDropdown(query) {
      return new Promise((resolve, reject) => {
        getBankDropdown(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // editAwareness

    editBank(query) {
      return new Promise((resolve, reject) => {
        editBank(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateBank(data) {
      return new Promise((resolve, reject) => {
        updateBank(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createBank(data) {
      return new Promise((resolve, reject) => {
        createBank(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteBank(data) {
      return new Promise((resolve, reject) => {
        deleteBank(data)
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



 
