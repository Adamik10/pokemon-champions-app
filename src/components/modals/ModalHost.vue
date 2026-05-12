<template>
  <Transition name="fade">
    <div
      v-if="modal.activeModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click="closeModal()">
      <div
        class="border-base-lilac relative min-h-1/2 w-9/10 overflow-hidden rounded-tl-[3rem]
          rounded-tr-lg rounded-br-[3rem] rounded-bl-lg border-2 bg-white shadow-xl outline-5
          outline-white"
        :class="[isClosing ? 'modal-animation-out' : 'modal-animation']"
        @click.stop>
        <div class="bg-base-lilac flex h-16 items-center justify-between pl-5">
          <h2 class="text-headline pl-auto text-white">
            {{ modalTitle }}
          </h2>
          <button
            class="rotate-45 p-4 transition-transform duration-100 active:scale-85"
            @click="closeModal()">
            <PlusIcon :size="30" />
          </button>
        </div>
        <div class="h-full w-full p-5">
          <component :is="currentModal" v-bind="modal.props" @close="closeModal()" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { type Component, defineComponent } from "vue"

import PlusIcon from "@/assets/PlusIcon.vue"
import { useModalStore } from "@/stores/modal"

export default defineComponent({
  name: "ModalHost",
  components: {
    PlusIcon,
  },
  data() {
    return {
      modal: useModalStore(),
      isClosing: false,
    }
  },
  computed: {
    currentModal(): Component | null {
      return this.modal?.activeModal || null
    },
    modalTitle(): string {
      return this.modal?.title || ""
    },
  },
  methods: {
    closeModal() {
      this.isClosing = true
      setTimeout(() => {
        this.modal.close()
        this.isClosing = false
      }, 100)
    },
  },
})
</script>
