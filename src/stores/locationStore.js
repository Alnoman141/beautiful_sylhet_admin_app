import { createLocation, getGoogleMapsApiKey, getLocation, getLocations, updateLocation } from '@/api/location'
import { defineStore } from 'pinia'

export const useLocationStore = defineStore('locationStore', {
  state: () => ({
    locations: [],
    location: {},
  }),

  actions: {
    // get all locations
    getLocations(query) {
      return new Promise((resolve, reject) => {
        getLocations(query)
          .then(response => {
            this.locations = response.data.data
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // get a location by id
    getLocation(id) {
      return new Promise((resolve, reject) => {
        getLocation(id)
          .then(response => {
            this.location = response.data.data
            resolve(response)
          }).catch(error => {
            reject(error)
          })
      })
    },

    // create a location
    createLocation(data) {
      return new Promise((resolve, reject) => {
        createLocation(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // update a location
    updateLocation(data) {
      return new Promise((resolve, reject) => {
        updateLocation(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // get google maps api key
    getGoogleMapsApiKey() {
      return new Promise((resolve, reject) => {
        getGoogleMapsApiKey()
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
