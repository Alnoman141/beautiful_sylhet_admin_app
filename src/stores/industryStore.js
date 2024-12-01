import { defineStore } from 'pinia'
import { getIndustries, createIndustry, updateIndustry } from '@/api/industry'

export const useIndustryStore = defineStore('industryStore', {
  state: () => ({
    industries: [],
    industry: {},
  }),

  actions: {
    // get all industries
    getIndustries(query) {
      return new Promise((resolve, reject) => {
        getIndustries(query)
          .then(response => {
            this.industries = response.data.data
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // create a industry
    createIndustry(data) {
      return new Promise((resolve, reject) => {
        createIndustry(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // update a industry
    updateIndustry(data) {
      return new Promise((resolve, reject) => {
        updateIndustry(data)
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
