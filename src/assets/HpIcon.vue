<template>
  <svg width="54" height="47" viewBox="0 0 54 47" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M38.5605 0C46.5466 0 53.0204 6.69011 53.0205 14.9424C53.0205 18.6167 51.7364 21.9808 49.6074 24.583H49.6465L49.4717 24.7461C48.7198 25.6389 47.868 26.4394 46.9326 27.127L26.5098 46.2734L5.95898 26.8828C5.07371 26.2157 4.26548 25.4523 3.54883 24.6084L3.52148 24.583H3.52734C1.32732 21.9807 0 18.6169 0 14.9424C5.66946e-06 6.69004 6.69004 0 14.9424 0C19.8594 6.04969e-05 24.2214 2.37555 26.9443 6.04102C29.5795 2.37522 33.8019 1.58682e-06 38.5605 0Z"
      :class="colorClass" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "HpIcon",
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
