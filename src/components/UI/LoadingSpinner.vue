<template>
  <div class="flex items-center justify-center p-4">
    <div
      :class="`border-${color} relative flex h-8 w-8 animate-spin items-center justify-center
        rounded-full border-4 border-t-transparent`">
      <div :class="`bg-${color} absolute top-[calc(50%-4px)] h-2 w-2 rounded-full`" />
      <div :class="`bg-${color} h-0.5 w-full`" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "LoadingSpinner",
  props: {
    color: {
      type: String,
      default: "base-purple",
    },
  },
})
</script>
