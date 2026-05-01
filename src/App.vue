<template>
  <div class="-mt-[env(safe-area-inset-bottom)] h-dvh pb-[env(safe-area-inset-bottom)]">
    <BurgerMenu />
    <RouterView />
    <ModalHost />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import BurgerMenu from "@/components/layouts/BurgerMenu.vue"
import ModalHost from "@/components/modals/ModalHost.vue"

export default defineComponent({
  name: "App",
  components: {
    BurgerMenu,
    ModalHost,
  },
})
</script>
