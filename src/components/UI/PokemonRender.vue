<template>
  <div
    class="bg-base-lilac flex aspect-square w-3/4 max-w-3/4 items-center justify-center
      rounded-full">
    <img
      :src="
        pokemon
          ? `https://s3.pokeos.com/pokeos-uploads/assets/pokemon/home/animated/${pokemon.id}.gif?v=7`
          : 'https://www.pokeos.com/src/misc/missingno.gif'
      "
      alt="pokemon image"
      class="h-auto max-h-full w-auto max-w-full" />
  </div>
</template>

<script lang="ts">
import type { Pokemon } from "pokenode-ts"
import { defineComponent } from "vue"

export default defineComponent({
  name: "PokemonRender",
  props: {
    pokemon: Object as () => Pokemon | null,
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
