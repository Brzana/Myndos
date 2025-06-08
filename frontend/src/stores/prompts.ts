import { defineStore } from 'pinia'

export const usePromptsStore = defineStore('prompts', {
  state: () => ({
    prompts: [],
  }),
  actions: {
    // fetch, add, update prompts
  },
})
