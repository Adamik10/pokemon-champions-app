<template>
  <div class="bg-grey -ml-3 flex h-4 w-fit shrink rounded-xs">
    <div
      class="flex aspect-square h-full justify-center rounded-xs align-middle"
      :class="`bg-type-${type}`">
      <img :src="`/icons/type-${type}.png`" alt="typing" class="aspect-square h-full w-auto" />
    </div>
    <span
      class="text-label w-fit px-0.5 text-white"
      :class="type && type.length > 5 ? 'px-0.5' : 'px-3'"
      >{{ type }}</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy"

export default defineComponent({
  name: "TypeLabel",
  props: {
    type: String as () => PokemonType,
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
