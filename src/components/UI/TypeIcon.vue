<template>
  <div
    class="flex aspect-square h-full justify-center rounded-xs align-middle"
    :class="type ? `bg-type-${type.toLocaleLowerCase()}` : 'bg-white/20'">
    <img
      v-if="type"
      :src="`/icons/type-${type.toLocaleLowerCase()}.png`"
      alt="typing"
      class="aspect-square w-auto"
      :class="smallerIcon ? 'm-auto h-8/10' : 'h-full'" />
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
  name: "TypeIcon",
  props: {
    type: String as () => PokemonType | undefined,
    smallerIcon: Boolean,
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
