<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="`0 0 ${size} ${size}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24 13C24 19.0751 19.0751 24 13 24C6.92487 24 2 19.0751 2 13C2 6.92487 6.92487 2 13 2C19.0751 2 24 6.92487 24 13Z"
      fill="white"
      fill-opacity="0.5" />
    <path
      d="M24 13C24 6.92487 19.0751 2 13 2C6.92487 2 2 6.92487 2 13C2 19.0751 6.92487 24 13 24C19.0751 24 24 19.0751 24 13ZM26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13Z"
      :class="colorClass" />
    <path
      d="M16 13C16 11.3431 14.6569 10 13 10C11.3431 10 10 11.3431 10 13C10 14.6569 11.3431 16 13 16C14.6569 16 16 14.6569 16 13ZM18 13C18 15.7614 15.7614 18 13 18C10.2386 18 8 15.7614 8 13C8 10.2386 10.2386 8 13 8C15.7614 8 18 10.2386 18 13Z"
      :class="colorClass" />
    <path d="M24 13V14H16V13H24Z" :class="colorClass" />
    <path d="M10 13V14H2V13H10Z" :class="colorClass" />
  </svg>
</template>

<script lang="ts">
export default {
  name: "Pokeball",
  props: {
    size: {
      type: Number,
      default: 26,
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
}
</script>
