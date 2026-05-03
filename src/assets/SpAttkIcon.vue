<template>
  <svg width="66" height="43" viewBox="0 0 66 43" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M33 0C51.2254 0 66 9.62588 66 21.5C66 33.3741 51.2254 43 33 43C14.7746 43 0 33.3741 0 21.5C0 9.62588 14.7746 0 33 0ZM33 5C18.6406 5 7 11.7157 7 20C7 28.2843 18.6406 35 33 35C47.3594 35 59 28.2843 59 20C59 11.7157 47.3594 5 33 5Z"
      :class="colorClass" />
    <path
      d="M33 7C45.7025 7 56 12.8203 56 20C56 27.1797 45.7025 33 33 33C20.2975 33 10 27.1797 10 20C10 12.8203 20.2975 7 33 7ZM33 10C23.6112 10 16 13.5817 16 18C16 22.4183 23.6112 26 33 26C42.3888 26 50 22.4183 50 18C50 13.5817 42.3888 10 33 10Z"
      :class="colorClass" />
    <ellipse cx="33" cy="17.5" rx="11" ry="5.5" :class="colorClass" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "SpAttkIcon",
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
