import { getSpotRating, publishSpotRating } from '@/api/toruism/spotRating'
import { defineStore } from 'pinia'

export const useSpotRatingStore = defineStore('spotRatingStore', {
  actions: {     
    getSpotRating(query) {
      return new Promise((resolve, reject) => {
        getSpotRating(query)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    publishSpotRating(id, status) {
      return new Promise((resolve, reject) => {
        publishSpotRating(id, status)
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



 
