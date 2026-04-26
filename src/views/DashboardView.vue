<template>
  <PlayerPokemonDetails />
  <OpponentPokemonDetails />
  <div
    class="bg-electric-blue fixed inset-0 -z-10 flex h-screen w-screen items-center justify-center
      text-white">
    smart stuff
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
