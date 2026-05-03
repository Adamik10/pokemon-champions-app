<template>
  <div
    class="bg-base-lilac outline-base-lilac flex h-full w-auto flex-col justify-center
      rounded-tl-2xl rounded-tr-sm rounded-br-2xl rounded-bl-sm border border-white py-1
      align-middle outline-2">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "RoundedTable",
  props: {
    exampleProp: String,
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
