<template>
  <svg width="71" height="58" viewBox="0 0 71 58" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M70.8896 45.1113L36.5215 58L0 45.1113V0H70.8896V45.1113ZM31.0605 18.252L12.4697 9.77246L24.209 23.2002L2.76172 26.6982L24.209 30.1973L12.4697 43.624L31.0605 35.1455L35.9053 50.6357L40.75 35.1455L59.3408 43.624L47.6006 30.1973L69.0479 26.6982L47.6006 23.2002L59.3408 9.77246L40.75 18.252L35.9053 2.76172L31.0605 18.252Z"
      :class="colorClass" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "DefIcon",
  props: {
    colorClass: {
      type: String,
      default: "fill-white",
    },
    exampleProp: String,
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
