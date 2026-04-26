<template>
  <div
    class="text-primary flex h-5 w-auto justify-center overflow-hidden px-3 align-middle
      text-ellipsis whitespace-nowrap capitalize"
    :class="[getColorClass(), textColor || 'text-white']"
    style="
      clip-path: polygon(
        10px 0%,
        calc(100% - 10px) 0%,
        100% 50%,
        calc(100% - 10px) 100%,
        10px 100%,
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

type Color = "lilac" | "black"
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
        case "black":
        default:
          return "bg-black/40"
      }
    },
  },
})
</script>
