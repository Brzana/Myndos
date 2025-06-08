import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    role: null,
  }),
  actions: {
    // login, logout, fetch user, etc.
  },
})
