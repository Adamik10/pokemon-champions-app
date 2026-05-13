<template>
  <div class="flex h-[80vh] w-full flex-col">
    <div class="relative h-full w-full">
      <input
        name="search"
        ref="inputRef"
        type="text"
        class="bg-base-lilac h-8 w-full px-3 text-white focus:border-0 focus:outline-0"
        :value="search"
        @input="search = ($event.target as HTMLInputElement).value"
        @focus="focusHandler" />
      <div
        v-if="isAutosuggestOpen"
        class="border-base-lilac absolute top-8 max-h-9/10 w-full overflow-y-scroll rounded-br-3xl
          rounded-bl-sm border-t-0 border-r border-b border-l bg-white shadow-lg">
        <ul class="flex h-full flex-col">
          <li
            v-for="pokemon in filteredPokemon"
            :key="pokemon.name"
            class="text-headline text-base-purple flex items-center px-4 capitalize"
            @click="addPokemonToTeam(pokemon)">
            <PokemonSprite
              :pokemon="pokemon"
              :all-pokemon="allPokemon"
              class="mr-2 inline h-10 w-10 bg-cover" />
            <span>{{ formatName(pokemon.name) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue"

import PokemonSprite from "@/components/PokemonSprite.vue"
import type { PokemonAutosuggestResult, Side } from "@/global/gloabl.types"
import { usePokemonStore } from "@/stores/pokemon"

export default defineComponent({
  name: "AddPokemonModal",
  components: {
    PokemonSprite,
  },
  props: {
    side: {
      type: String as () => Side,
      required: true,
    },
  },
  emits: ["close"],
  setup() {
    return {
      pokemonStore: usePokemonStore(),
    }
  },
  data() {
    return {
      isLoading: false,
      isAutosuggestOpen: false,
      allPokemon: [] as PokemonAutosuggestResult[],
      search: "",
    }
  },
  computed: {
    filteredPokemon(): PokemonAutosuggestResult[] {
      if (!this.search) {
        return this.allPokemon
      }
      return this.allPokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.search.toLowerCase())
      )
    },
  },
  mounted() {
    this.getAllPokemon()
    nextTick(() => {
      const input = this.$refs.inputRef as HTMLInputElement
      input?.focus()
    })
  },
  methods: {
    getAllPokemon() {
      this.isLoading = true
      this.pokemonStore
        .getAllPokemon()
        .then(data => {
          this.allPokemon = data
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    focusHandler() {
      this.isAutosuggestOpen = true
    },
    formatName(name: string): string {
      const parts = name.split("-")
      const megaIndex = parts.indexOf("mega")
      if (megaIndex === -1) {
        return parts.join(" ")
      }
      const returnName = parts.slice(0, megaIndex).join(" ")
      const megaSuffix = parts.slice(megaIndex + 1).join(" ")
      if (!megaSuffix) {
        return `mega ${returnName}`
      }
      return `mega ${returnName} ${megaSuffix}`
    },
    addPokemonToTeam(pokemon: PokemonAutosuggestResult) {
      this.pokemonStore.addPokemonToTeam(pokemon, this.side)
      this.$emit("close")
    },
  },
})
</script>
