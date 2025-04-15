import { createNews, deleteNews, editNews, getNews, getNewsType, publishNews, updateNews } from '@/api/toruism/news'
import { defineStore } from 'pinia'

export const useNewsStore = defineStore('newsStore', {
  actions: {     
    getNews(query) {
      return new Promise((resolve, reject) => {
        getNews(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getNewsType(query) {
      return new Promise((resolve, reject) => {
        getNewsType(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // editAwareness

    editNews(query) {
      return new Promise((resolve, reject) => {
        editNews(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateNews(data) {
      return new Promise((resolve, reject) => {
        updateNews(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createNews(data) {
      return new Promise((resolve, reject) => {
        createNews(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteNews(data) {
      return new Promise((resolve, reject) => {
        deleteNews(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // publishNews

    publishNews(data) {
      return new Promise((resolve, reject) => {
        publishNews(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getNewsById(id) {
      return new Promise((resolve, reject) => {
        getNewsById(id)
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



 
