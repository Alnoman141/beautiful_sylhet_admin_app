import { defineStore } from 'pinia'
import { getPositions, createPosition, updatePosition } from '@/api/position'

export const usePositionStore = defineStore('positionStore', {
  state: () => ({
    positions: [],
    position: {},
  }),

  actions: {
    // get all positions
    getPositions(query) {
      return new Promise((resolve, reject) => {
        getPositions(query)
          .then(response => {
            this.positions = response.data.data
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // create a position
    createPosition(data) {
      return new Promise((resolve, reject) => {
        createPosition(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // update a position
    updatePosition(data) {
      return new Promise((resolve, reject) => {
        updatePosition(data)
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
