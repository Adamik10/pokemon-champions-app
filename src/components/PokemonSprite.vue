<template>
  <img :src="spriteUrl" :alt="pokemon.name" @error="setMissingNo" />
</template>

<script lang="ts">
import type { Pokemon } from "pokenode-ts"
import { defineComponent } from "vue"

import { getPokemonSpriteUrl } from "@/components/PokemonSprite.helper"
import type { PokemonAutosuggestResult } from "@/global/gloabl.types"

export default defineComponent({
  name: "PokemonSprite",
  props: {
    pokemon: {
      type: Object as () => Pokemon | PokemonAutosuggestResult,
      required: true,
    },
    allPokemon: {
      type: Array as () => PokemonAutosuggestResult[],
      required: false,
    },
  },
  computed: {
    spriteUrl(): string {
      return getPokemonSpriteUrl(this.pokemon, this.allPokemon)
    },
  },
  methods: {
    setMissingNo(event: Event) {
      const target = event.target as HTMLImageElement
      target.src = "https://www.pokeos.com/src/misc/missingno.gif"
    },
  },
})
</script>
