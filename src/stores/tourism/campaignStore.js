import { createCampaign, deleteCampaign, editCampaign, getCampaign, updateCampaign } from '@/api/toruism/campaign'
import { defineStore } from 'pinia'

export const useCampaignStore = defineStore('campaignStore', {
  actions: {     
    getCampaign(query) {
      return new Promise((resolve, reject) => {
        getCampaign(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getCampaignType(query) {
      return new Promise((resolve, reject) => {
        getCampaignType(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // editAwareness

    editCampaign(query) {
      return new Promise((resolve, reject) => {
        editCampaign(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateCampaign(data) {
      return new Promise((resolve, reject) => {
        updateCampaign(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createCampaign(data) {
      return new Promise((resolve, reject) => {
        createCampaign(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteCampaign(data) {
      return new Promise((resolve, reject) => {
        deleteCampaign(data)
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



 
