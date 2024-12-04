import { createNotice, deleteNotice, editNotice, getNotice, updateNotice } from '@/api/toruism/notice'
import { defineStore } from 'pinia'

export const useNoticeStore = defineStore('noticeStore', {
  actions: {     
    getNotice(query) {
      return new Promise((resolve, reject) => {
        getNotice(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    getNoticeType(query) {
      return new Promise((resolve, reject) => {
        getNoticeType(query)
          .then(response => {
            
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // editAwareness

    editNotice(query) {
      return new Promise((resolve, reject) => {
        editNotice(query)
          .then(response => {
            console.log(response)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateNotice(data) {
      return new Promise((resolve, reject) => {
        updateNotice(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    

    createNotice(data) {
      return new Promise((resolve, reject) => {
        createNotice(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    deleteNotice(data) {
      return new Promise((resolve, reject) => {
        deleteNotice(data)
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



 
