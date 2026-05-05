<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 4.16406H4.15527V1H6.2998V4.16406H9.47266V6.30859H6.2998V9.45508H4.15527V6.30859H1V4.16406Z"
      fill="white" />
    <path
      d="M4.15527 1V4.16406H1V6.30859H4.15527V9.45508H6.2998V6.30859H9.47266V4.16406H6.2998V1H4.15527ZM7.2998 3.16406H10.4727V7.30859H7.2998V10.4551H3.15527V7.30859H0V3.16406H3.15527V0H7.2998V3.16406Z"
      :class="colorClass" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "PlusIcon",
  props: {
    size: {
      type: Number,
      default: 11,
    },
    colorClass: {
      type: String,
      default: "fill-base-lilac",
    },
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
