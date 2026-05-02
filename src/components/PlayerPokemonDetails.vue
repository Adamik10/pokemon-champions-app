<template>
  <div class="fixed top-0 flex w-full flex-col gap-2 bg-white px-1 pt-2">
    <!-- Team selection section -->
    <div class="flex w-full justify-center gap-5">
      <Pokeball />
      <Pokeball />
      <Pokeball />
      <Pokeball />
      <Pokeball />
      <Pokeball />
    </div>
    <!-- Pokemon details section -->
    <div class="flex w-full">
      <!-- Image ability item section -->
      <div class="flex w-1/3 flex-col items-center gap-1">
        <PokemonRender />
        <KeyValueText category="Ability" value="mega sol" />
        <KeyValueText category="Item" value="Meganiumite" />
      </div>
      <!-- Name typing moves section -->
      <div class="flex w-1/3 flex-col">
        <div class="text-headline -ml-5">Crabominable</div>
        <TypeLabel type="ice" />
        <div>Moves</div>
      </div>
      <!-- Stats section -->
      <div class="w-1/3">
        <div>Stats</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Pokemon } from "pokenode-ts"

import Pokeball from "@/assets/Pokeball.vue"
import KeyValueText from "@/components/UI/KeyValueText.vue"
import PokemonRender from "@/components/UI/PokemonRender.vue"
import TypeLabel from "@/components/UI/TypeLabel.vue"
import { usePokemonStore } from "@/stores/pokemon"

export default {
  name: "PlayerPokemonDetails",
  components: {
    Pokeball,
    KeyValueText,
    PokemonRender,
    TypeLabel,
  },
  setup() {
    return {
      pokemonStore: usePokemonStore(),
    }
  },
  data(): {
    pokemon: Pokemon | null
  } {
    return {
      pokemon: null,
    }
  },
  mounted() {
    this.getPokemon()
  },
  methods: {
    async getPokemon() {
      const pokemon = await this.pokemonStore.getPokemonById(1000)
      if (pokemon) {
        console.log(pokemon)
        this.pokemon = pokemon
      }
    },
  },
}
</script>
