<template>
  <div
    class="bg-base-lilac flex aspect-square w-3/4 max-w-3/4 items-center justify-center
      rounded-full">
    <img
      src="https://s3.pokeos.com/pokeos-uploads/assets/pokemon/home/animated/1000.gif?v=7"
      alt="pokemon image"
      class="h-auto max-h-full w-auto max-w-full" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "PokemonRender",
  props: {
    exampleProp: String,
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
