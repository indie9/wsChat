import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const userLogin = defineStore('userLogin', {
  state: () => {
    return { 
      token: null,
      user: null,
      isAdmin: false
    }
  },
  actions: {
    tokenSet(val) {
      this.token = val
    },
    userSet(val) {
      this.user = val
      if (this.user && this.user.roles.includes('ADMIN')) {
        this.isAdmin = true
      } else {
        this.isAdmin = false
      }
    },
  },
})