import { createDoctor, deleteDoctor, editDoctor, getDoctor, updateDoctor } from '@/api/toruism/doctor'
import { defineStore } from 'pinia'

export const useDoctorStore = defineStore('doctorStore', {
  actions: {     
    getDoctor(query) {
      return new Promise((resolve, reject) => {
        getDoctor(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },


    // editAwareness

    editDoctor(query) {
      return new Promise((resolve, reject) => {
        editDoctor(query)
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateDoctor(data) {
      return new Promise((resolve, reject) => {
        updateDoctor(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createDoctor(data) {
      return new Promise((resolve, reject) => {
        createDoctor(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteDoctor(data) {
      return new Promise((resolve, reject) => {
        deleteDoctor(data)
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



 
