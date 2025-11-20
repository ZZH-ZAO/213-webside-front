import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null
  }),
  getters: {
    isLogged: (state) => !!state.token
  },
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('lab_token', token)
    },
    loadToken() {
      const t = localStorage.getItem('lab_token')
      if (t) this.token = t
    },
    setUser(user) {
      this.user = user
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('lab_token')
    }
  }
})