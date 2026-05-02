<template>
  <div class="bg-grey flex h-4 w-fit shrink rounded-xs">
    <TypeIcon :type="type" />
    <span
      class="text-label w-fit px-0.5 text-white"
      :class="type && type.length > 5 ? 'px-0.5' : 'px-3'">
      {{ type }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import type { PokemonType } from "@/components/UI/TypeIcon.vue"
import TypeIcon from "@/components/UI/TypeIcon.vue"

export default defineComponent({
  name: "TypeLabel",
  components: {
    TypeIcon,
  },
  props: {
    type: String as () => PokemonType,
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
