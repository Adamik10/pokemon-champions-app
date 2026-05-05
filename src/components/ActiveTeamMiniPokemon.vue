<template>
  <div>{{ pokemon.id }}</div>
</template>

<script lang="ts">
import type { Pokemon } from "pokenode-ts"
import { defineComponent } from "vue"

export default defineComponent({
  name: "ActiveTeamMiniPokemon",
  props: {
    pokemon: {
      type: Object as () => Pokemon,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
