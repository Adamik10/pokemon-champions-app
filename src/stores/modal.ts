// stores/modal.ts
import { defineStore } from "pinia"

export type ModalType = "add-pokemon"

export const useModalStore = defineStore("modal", {
  state: () => ({
    activeModal: null as null | ModalType,
    props: {} as Record<string, unknown>,
  }),
  actions: {
    open(modal: ModalType, props = {}) {
      this.activeModal = modal
      this.props = props
    },
    close() {
      this.activeModal = null
      this.props = {}
    },
  },
})
