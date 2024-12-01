import { defineStore } from 'pinia'
import { getCategories, createCategory, updateCategory } from '@/api/category'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: [],
    category: {},
  }),

  actions: {
    // get all categories
    getCategories(query) {
      return new Promise((resolve, reject) => {
        getCategories(query)
          .then(response => {
            this.categories = response.data.data
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // create a category
    createCategory(data) {
      return new Promise((resolve, reject) => {
        createCategory(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // update a category
    updateCategory(data) {
      return new Promise((resolve, reject) => {
        updateCategory(data)
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
