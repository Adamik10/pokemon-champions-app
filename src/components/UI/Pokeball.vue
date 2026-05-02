<template>
  <div class="relative">
    <PokeballIcon />
    <PlusIcon class="absolute -right-px -bottom-px" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import PlusIcon from "@/assets/PlusIcon.vue"
import PokeballIcon from "@/assets/PokeballIcon.vue"

export default defineComponent({
  name: "Pokeball",
  components: {
    PlusIcon,
    PokeballIcon,
  },
  props: {
    pokemon: Object,
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
