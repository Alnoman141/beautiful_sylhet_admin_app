import { defineStore } from 'pinia'
import { getSkills, createSkill, updateSkill } from '@/api/skill'

export const useSkillStore = defineStore('skillStore', {
  state: () => ({
    skills: [],
    skill: {},
  }),

  actions: {
    // get all skills
    getSkills(query) {
      return new Promise((resolve, reject) => {
        getSkills(query)
          .then(response => {
            this.skills = response.data.data
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // create a skill
    createSkill(data) {
      return new Promise((resolve, reject) => {
        createSkill(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // update a skill
    updateSkill(data) {
      return new Promise((resolve, reject) => {
        updateSkill(data)
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
