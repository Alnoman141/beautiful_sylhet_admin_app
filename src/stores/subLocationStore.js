import { defineStore } from 'pinia'
import { getSubLocations, createSubLocation, updateSubLocation } from '@/api/subLocation'

export const useSubLocationStore = defineStore('subLocationStore', {
  state: () => ({
    subLocations: [],
    subLocation: {},
  }),

  actions: {
    // get all sub locations
    getSubLocations(query) {
      return new Promise((resolve, reject) => {
        getSubLocations(query)
          .then(response => {
            this.subLocations = response.data.data
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // create a sub location
    createSubLocation(data) {
      return new Promise((resolve, reject) => {
        createSubLocation(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // update a sub location
    updateSubLocation(data) {
      return new Promise((resolve, reject) => {
        updateSubLocation(data)
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
