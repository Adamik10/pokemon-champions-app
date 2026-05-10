<template>
  <div class="flex w-full justify-center gap-4">
    <template v-for="index in 6" :key="index">
      <ActiveTeamMiniPokemon v-if="team && team[index]" :pokemon="team[index]" />
      <Pokeball
        v-else
        class="transition-transform duration-100 active:scale-85"
        @click="openAddPokemonModal()" />
    </template>
  </div>
</template>

<script lang="ts">
import type { Pokemon } from "pokenode-ts"
import { defineComponent } from "vue"

import ActiveTeamMiniPokemon from "@/components/ActiveTeamMiniPokemon.vue"
import Pokeball from "@/components/UI/Pokeball.vue"
import AddPokemonModal from "@/components/modals/AddPokemonModal.vue"
import { useModalStore } from "@/stores/modal"

export default defineComponent({
  name: "ActiveTeam",
  components: {
    Pokeball,
    ActiveTeamMiniPokemon,
  },
  props: {
    team: {
      type: Array as () => Pokemon[],
    },
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    openAddPokemonModal() {
      const modal = useModalStore()
      modal.open(AddPokemonModal, "Add Your Pokémon")
    },
  },
})
</script>
