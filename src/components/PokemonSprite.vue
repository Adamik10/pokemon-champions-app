<template>
  <img :src="currentSrc" :alt="pokemon.name" @error="handleError" />
</template>

<script lang="ts">
import type { NamedAPIResourceList, Pokemon } from "pokenode-ts"
import { defineComponent } from "vue"

import { getPokemonImageUrl } from "@/components/PokemonSprite.helper"

export default defineComponent({
  name: "PokemonSprite",
  props: {
    pokemon: {
      type: Object as () => Pokemon | NamedAPIResourceList["results"][0],
      required: true,
    },
    allPokemon: {
      type: Array as () => NamedAPIResourceList["results"][0][],
      required: false,
    },
  },
  data() {
    return {
      imageIndex: 0,
    }
  },
  computed: {
    imageUrls(): string[] {
      return getPokemonImageUrl(this.pokemon, "sprite", this.allPokemon)
    },
    currentSrc(): string {
      return this.imageUrls[this.imageIndex]
    },
  },
  watch: {
    pokemon: {
      immediate: true,
      handler() {
        this.imageIndex = 0
      },
    },
  },
  methods: {
    handleError(event: Event) {
      const target = event.target as HTMLImageElement

      if (this.imageIndex < this.imageUrls.length - 1) {
        this.imageIndex++
        target.src = this.currentSrc
      }
    },
  },
})
</script>
