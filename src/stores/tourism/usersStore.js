import { getTestUserList } from '@/api/toruism/usersApi'
import { defineStore } from 'pinia'

export const useTestStore = defineStore('testStore', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: state => state.count * 2,
  },
  actions: {
     
    async getTestUserList() {
      return await getTestUserList()
    },
  },
})
