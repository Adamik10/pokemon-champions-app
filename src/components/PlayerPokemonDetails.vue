<template>
  <div class="fixed top-0 flex w-full flex-col gap-2 bg-white px-px pt-2">
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
        <KeyValueText category="Ability" value="mega sol" width-class="w-9/10 mr-auto" />
        <KeyValueText category="Item" value="Meganiumite" width-class="w-9/10 mr-auto" />
      </div>
      <!-- Name typing moves section -->
      <div class="flex w-1/3 flex-col gap-1">
        <div class="text-headline -mb-px -ml-5">Crabominable</div>
        <div class="-ml-3 flex w-full gap-1">
          <TypeLabel type="ice" />
          <TypeLabel type="fighting" />
        </div>
        <div class="mt-1 flex w-9/10 flex-col gap-1.5">
          <MoveLabel />
          <MoveLabel />
          <MoveLabel />
          <MoveLabel />
        </div>
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

import KeyValueText from "@/components/UI/KeyValueText.vue"
import MoveLabel from "@/components/UI/MoveLabel.vue"
import Pokeball from "@/components/UI/Pokeball.vue"
import PokemonRender from "@/components/UI/PokemonRender.vue"
import TypeLabel from "@/components/UI/TypeLabel.vue"
import { usePokemonStore } from "@/stores/pokemon"

export default {
  name: "PlayerPokemonDetails",
  components: {
    KeyValueText,
    PokemonRender,
    TypeLabel,
    MoveLabel,
    Pokeball,
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
