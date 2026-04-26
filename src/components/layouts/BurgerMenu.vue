<template>
  <button type="button" class="fixed top-3 left-3 z-20 flex flex-col gap-1">
    <div
      v-for="index in 3"
      :key="index"
      class="outline-base-lilac h-1 w-6 -skew-x-10 transform rounded-tl-sm rounded-tr-[1px]
        rounded-br-sm rounded-bl-[1px] bg-white outline-2" />
  </button>
</template>

<script lang="ts">
export default {
  name: "BurgerMenu",
  data() {
    return {}
  },
  methods: {},
}
</script>
