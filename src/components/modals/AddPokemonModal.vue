<template>
  <h2>Add Pokémon</h2>
  <button @click="$emit('close')">Close</button>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AddPokemonModal",
  props: {
    exampleProp: String,
  },
  emits: ["close"],
  data() {
    return {}
  },
  methods: {},
})
</script>
