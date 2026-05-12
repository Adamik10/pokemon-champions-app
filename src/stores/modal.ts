// stores/modal.ts
import { defineStore } from "pinia"
import type { Component } from "vue"
import { markRaw } from "vue"

export const useModalStore = defineStore("modal", {
  state: () => ({
    activeModal: null as null | Component,
    title: null as null | string,
    props: {} as Record<string, unknown>,
  }),
  actions: {
    open(component: Component, title: string, props: Record<string, unknown> = {}) {
      this.activeModal = markRaw(component)
      this.title = title
      this.props = props
    },
    close() {
      this.activeModal = null
      this.title = null
      this.props = {}
    },
  },
})
