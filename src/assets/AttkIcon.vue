<template>
  <svg width="72" height="52" viewBox="0 0 72 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M36 0L41.2622 16.8248L61.4558 7.61522L48.7041 22.1995L72 26L48.7041 29.8005L61.4558 44.3848L41.2622 35.1752L36 52L30.7378 35.1752L10.5442 44.3848L23.2959 29.8005L0 26L23.2959 22.1995L10.5442 7.61522L30.7378 16.8248L36 0Z"
      :class="colorClass" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AttkIcon",
  props: {
    colorClass: {
      type: String,
      default: "fill-white",
    },
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
