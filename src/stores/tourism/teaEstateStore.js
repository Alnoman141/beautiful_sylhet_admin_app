import { createTeaEstate, getTeaEstate, updateTeaEstate, getTeaEstateById } from '@/api/toruism/teaEstate'
import { defineStore } from 'pinia'

export const useTeaEstateStore = defineStore('teaEstateStore', {
  actions: {     
    getTeaEstate(query) {
      return new Promise((resolve, reject) => {
        getTeaEstate(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getTeaEstateById(id) {
      return new Promise((resolve, reject) => {
        getTeaEstateById(id)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    updateTeaEstate(data) {
      return new Promise((resolve, reject) => {
        updateTeaEstate(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createTeaEstate(data) {
      return new Promise((resolve, reject) => {
        createTeaEstate(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    getTeaEstateById(id) {
      return new Promise((resolve, reject) => {
        getTeaEstateById(id)
          .then(response => {
            this.location = response.data.data
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },
  },
})



 
