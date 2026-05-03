<template>
  <div class="relative flex w-full flex-col gap-2 bg-white px-0.5 pt-2 pb-3">
    <!-- Team selection -->
    <div class="flex w-full justify-center gap-4">
      <Pokeball />
      <Pokeball />
      <Pokeball />
      <Pokeball />
      <Pokeball />
      <Pokeball />
    </div>
    <!-- Pokemon details -->
    <div class="flex w-full">
      <!-- Image, ability, item section -->
      <div class="flex w-1/3 flex-col items-center gap-1">
        <PokemonRender />
        <KeyValueText category="Ability" value="mega sol" width-class="w-9/10 mr-auto" />
        <KeyValueText category="Item" value="Meganiumite" width-class="w-9/10 mr-auto" />
      </div>
      <!-- Name, typing, moves section -->
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
        <StatsSection />
      </div>
    </div>
    <div class="absolute -bottom-3 left-1 flex gap-1.5">
      <ActionButton
        v-for="actionButton in pokemonActionButtons"
        :key="actionButton"
        :action="actionButton" />
    </div>
  </div>
</template>

<script lang="ts">
import type { Pokemon } from "pokenode-ts"

import StatsSection from "@/components/StatsSection.vue"
import KeyValueText from "@/components/UI/KeyValueText.vue"
import MoveLabel from "@/components/UI/MoveLabel.vue"
import Pokeball from "@/components/UI/Pokeball.vue"
import PokemonRender from "@/components/UI/PokemonRender.vue"
import TypeLabel from "@/components/UI/TypeLabel.vue"
import ActionButton from "@/components/buttons/ActionButton.vue"
import { pokemonActionButtons } from "@/consts/global.consts"
import { usePokemonStore } from "@/stores/pokemon"

export default {
  name: "PlayerPokemonDetails",
  components: {
    KeyValueText,
    PokemonRender,
    TypeLabel,
    MoveLabel,
    Pokeball,
    StatsSection,
    ActionButton,
  },
  setup() {
    return {
      pokemonStore: usePokemonStore(),
      pokemonActionButtons,
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
        this.pokemon = pokemon
      }
    },
  },
}
</script>
