// stores/modal.ts
import { defineStore } from "pinia"
import type { Component } from "vue"
import { markRaw } from "vue"

export const useModalStore = defineStore("modal", {
  state: () => ({
    activeModal: null as null | Component,
    title: null as null | string,
  }),
  actions: {
    open(component: Component, title: string) {
      this.activeModal = markRaw(component)
      this.title = title
    },
    close() {
      this.activeModal = null
      this.title = null
    },
  },
})
