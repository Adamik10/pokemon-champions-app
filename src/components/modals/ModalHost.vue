<template>
  <div
    v-if="modal.activeModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div
      class="border-base-lilac relative min-h-1/2 w-9/10 rounded-tl-[3rem] rounded-tr-lg
        rounded-br-[3rem] rounded-bl-lg border-2 bg-white px-5 pt-7 shadow-xl outline-5
        outline-white">
      <div
        class="text-headline absolute top-0 right-0 rotate-45 p-4 transition-transform duration-100
          active:scale-85">
        <button @click="modal.close()">
          <PlusIcon :size="30" />
        </button>
      </div>
      <component :is="currentModal" v-bind="modal.props" @close="modal.close()" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"

import PlusIcon from "@/assets/PlusIcon.vue"
import AddPokemonModal from "@/components/modals/AddPokemonModal.vue"
import { useModalStore } from "@/stores/modal"

export default defineComponent({
  name: "ModalHost",
  components: {
    PlusIcon,
  },
  setup() {
    const modal = useModalStore()
    const modals = {
      "add-pokemon": AddPokemonModal,
    }

    const currentModal = computed(() => {
      return modal.activeModal ? modals[modal.activeModal] : null
    })

    return { modal, currentModal }
  },
})
</script>
