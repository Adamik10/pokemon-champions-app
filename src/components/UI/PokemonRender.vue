<template>
  <div
    class="bg-base-lilac relative flex aspect-square w-3/4 max-w-3/4 items-center justify-center
      rounded-full">
    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
      <div
        class="border-base-purple relative flex h-8 w-8 animate-spin items-center justify-center
          rounded-full border-4 border-t-transparent">
        <div class="bg-base-purple absolute top-[calc(50%-4px)] h-2 w-2 rounded-full" />
        <div class="bg-base-purple h-0.5 w-full" />
      </div>
    </div>
    <img
      :src="currentSrc"
      alt="pokemon image"
      class="h-auto max-h-full w-auto max-w-full transition-opacity duration-200"
      :class="isLoading ? 'opacity-0' : 'opacity-100'"
      @load="onLoad"
      @error="handleError" />
  </div>
</template>
<script lang="ts">
import type { Pokemon } from "pokenode-ts"
import { defineComponent } from "vue"

import { getPokemonImageUrl } from "@/components/PokemonSprite.helper"

export default defineComponent({
  name: "PokemonRender",
  props: {
    pokemon: Object as () => Pokemon | null,
  },
  data() {
    return {
      isLoading: true,
      imageIndex: 0,
    }
  },
  computed: {
    imageUrls(): string[] {
      return this.pokemon
        ? getPokemonImageUrl(this.pokemon, "animated-render")
        : getPokemonImageUrl(
            {
              name: "missingno",
              url: "",
            },
            "animated-render"
          )
    },
    currentSrc(): string {
      return this.imageUrls[this.imageIndex]
    },
  },
  watch: {
    pokemon: {
      immediate: true,
      handler() {
        this.imageIndex = 0
        this.isLoading = true
      },
    },
  },
  methods: {
    onLoad() {
      this.isLoading = false
    },
    handleError(event: Event) {
      const target = event.target as HTMLImageElement
      if (this.imageIndex < this.imageUrls.length - 1) {
        this.imageIndex++
        target.src = this.currentSrc
        return
      }
      this.isLoading = false
    },
  },
})
</script>
