<template>
  <div
    class="to-base-lilac outline-base-lilac flex h-5 w-full items-center overflow-hidden
      rounded-tl-lg rounded-tr-xs rounded-br-lg rounded-bl-xs border border-white bg-linear-to-r
      from-white align-middle outline-2">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "RoundedLabel",
  components: {},
  props: {},
  data() {
    return {}
  },
  methods: {},
})
</script>
