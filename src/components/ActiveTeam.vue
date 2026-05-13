<template>
  <div class="flex w-full justify-center gap-4">
    <template v-for="index in 6" :key="index">
      <div v-if="team && team[index - 1]" class="relative aspect-square w-6.5">
        <div
          v-if="isSelected(team[index - 1].pokemon.id)"
          class="absolute inset-0 rounded-full
            bg-[radial-gradient(circle,var(--color-active-green)_0%,transparent_80%)]" />
        <PokemonSprite
          :pokemon="team[index - 1].pokemon"
          @click="pokemonStore.setActivePokemon(team[index - 1], 'player')"
          class="relative h-auto w-full"
          :class="[
            {
              'jump-animation': isSelected(team[index - 1].pokemon.id),
              'opacity-50': !isSelected(team[index - 1].pokemon.id),
            },
          ]" />
      </div>
      <Pokeball
        v-else
        class="transition-transform duration-100 active:scale-85"
        @click="openAddPokemonModal()" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import PokemonSprite from "@/components/PokemonSprite.vue"
import Pokeball from "@/components/UI/Pokeball.vue"
import AddPokemonModal from "@/components/modals/AddPokemonModal.vue"
import { useModalStore } from "@/stores/modal"
import { usePokemonStore } from "@/stores/pokemon"

export default defineComponent({
  name: "ActiveTeam",
  components: {
    Pokeball,
    PokemonSprite,
  },
  setup() {
    return {
      pokemonStore: usePokemonStore(),
    }
  },
  data() {
    return {}
  },
  mounted() {},
  computed: {
    team() {
      return this.pokemonStore.playerTeam
    },
    activePokemon() {
      return this.pokemonStore.activePokemonPlayer
    },
  },
  methods: {
    openAddPokemonModal() {
      const modal = useModalStore()
      modal.open(AddPokemonModal, "Add Your Pokémon", { side: "player" })
    },
    isSelected(pokemonId: number): boolean {
      return this.activePokemon ? this.activePokemon.pokemon.id === pokemonId : false
    },
  },
})
</script>
