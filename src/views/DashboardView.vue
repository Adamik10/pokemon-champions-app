<template>
  <div class="flex h-full w-full flex-col">
    <PlayerPokemonDetails />
    <div
      class="bg-electric-blue flex h-screen w-screen flex-1 items-center justify-center text-white">
      smart stuff
    </div>
    <OpponentPokemonDetails />
  </div>
</template>

<script lang="ts">
import OpponentPokemonDetails from "@/components/OpponentPokemonDetails.vue"
import PlayerPokemonDetails from "@/components/PlayerPokemonDetails.vue"

export default {
  name: "DashboardView",
  components: {
    PlayerPokemonDetails,
    OpponentPokemonDetails,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
