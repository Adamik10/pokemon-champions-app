<template>
  <button
    class="h-10 w-10 overflow-hidden rounded-full border outline-1 transition-transform duration-100
      active:scale-85"
    :class="{
      [`from-active-yellow to-active-green outline-active-green shadow-active-glow border-white
      bg-linear-to-r`]: active,
      'border-base-lilac bg-white shadow-md outline-white': !active,
    }"
    @click="active = !active">
    <img
      :src="`icons/${action}-icon.svg`"
      :alt="action"
      class="h-full w-full object-contain"
      :class="{
        'pt-1.5 pb-0.5': action === 'tailwind',
        'scale-130 pl-px': action === 'tera',
        'p-0.5': action === 'mega',
      }" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { pokemonActionButtons } from "@/consts/global.consts"

export default defineComponent({
  name: "ActionButton",
  props: {
    action: String,
  },
  setup() {
    return {
      pokemonActionButtons,
    }
  },
  data() {
    return {
      active: false,
    }
  },
  methods: {},
})
</script>
