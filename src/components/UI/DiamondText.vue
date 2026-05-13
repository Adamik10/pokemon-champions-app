<template>
  <div
    class="flex h-3 w-auto justify-center overflow-hidden px-2 align-middle text-base text-ellipsis
      whitespace-nowrap capitalize"
    :class="[getColorClass(), textColor || 'text-white']"
    style="
      clip-path: polygon(
        6px 0%,
        calc(100% - 6px) 0%,
        100% 50%,
        calc(100% - 6px) 100%,
        6px 100%,
        0% 50%
      );
    ">
    <span class="block min-w-0 truncate">
      <slot />
    </span>
  </div>
</template>

<script lang="ts">
import { type PropType, defineComponent } from "vue"

type Color = "lilac" | "black" | "grey"
type TextColor = "white" | "black"

export default defineComponent({
  name: "DiamondText",
  props: {
    color: String as PropType<Color>,
    textColor: String as PropType<TextColor>,
  },
  data() {
    return {}
  },
  methods: {
    getColorClass() {
      switch (this.color) {
        case "lilac":
          return "bg-base-lilac"
        case "grey":
          return "bg-black/25"
        case "black":
        default:
          return "bg-black/40"
      }
    },
  },
})
</script>
