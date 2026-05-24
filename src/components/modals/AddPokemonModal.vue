<template>
  <div class="flex h-[80vh] w-full flex-col">
    <div class="relative h-full w-full">
      <input
        name="search"
        ref="inputRef"
        type="text"
        class="bg-base-lilac h-8 w-full px-3 text-white focus:border-0 focus:outline-0"
        :value="search"
        :disabled="isLoading"
        @input="search = ($event.target as HTMLInputElement).value"
        @focus="focusHandler" />
      <div
        v-if="isAutosuggestOpen"
        class="border-base-lilac absolute top-8 max-h-9/10 w-full overflow-y-scroll rounded-br-3xl
          rounded-bl-sm border-t-0 border-r border-b border-l bg-white shadow-lg">
        <div v-if="isLoading" class="flex min-h-32 items-center justify-center">
          <LoadingSpinner color="base-lilac" />
        </div>
        <ul v-else class="flex h-full flex-col">
          <li
            v-for="pokemon in filteredPokemon"
            :key="pokemon.name"
            class="text-headline text-base-purple flex items-center px-4 capitalize"
            @click="addPokemonToTeam(pokemon)">
            <PokemonSprite
              :pokemon="pokemon"
              :all-pokemon="allPokemon"
              class="mr-2 inline h-10 w-10 bg-cover" />
            <div class="flex items-end gap-1">
              <span v-if="formatPokemonName(pokemon.name).prefix" class="text-xs leading-none">
                {{ formatPokemonName(pokemon.name).prefix }}
              </span>
              <span>
                {{ formatPokemonName(pokemon.name).base }}
              </span>
              <span v-if="formatPokemonName(pokemon.name).suffix">
                {{ formatPokemonName(pokemon.name).suffix }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { NamedAPIResourceList } from "pokenode-ts"
import { defineComponent, nextTick } from "vue"

import PokemonSprite from "@/components/PokemonSprite.vue"
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue"
import type { Side } from "@/global/gloabl.types"
import { formatPokemonName } from "@/global/global.helper"
import { usePokemonStore } from "@/stores/pokemon"

export default defineComponent({
  name: "AddPokemonModal",
  components: {
    PokemonSprite,
    LoadingSpinner,
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
      formatPokemonName,
      pokemonStore: usePokemonStore(),
    }
  },
  data() {
    return {
      isLoading: false,
      isAutosuggestOpen: true,
      allPokemon: [] as NamedAPIResourceList["results"][0][],
      search: "",
    }
  },
  computed: {
    filteredPokemon(): NamedAPIResourceList["results"][0][] {
      if (!this.search) {
        return this.allPokemon
      }
      return this.allPokemon.filter(pokemon =>
        pokemon.name
          .toLowerCase()
          .replace(/(?<!mo)-(?!o)/g, " ")
          .includes(this.search.toLowerCase())
      )
    },
  },
  mounted() {
    this.getAllPokemon()
    nextTick(() => {
      this.focusInput()
    })
  },
  watch: {
    isLoading(newValue) {
      if (!newValue) {
        nextTick(() => {
          this.focusInput()
        })
      }
    },
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
    focusInput() {
      const input = this.$refs.inputRef as HTMLInputElement
      input?.focus()
    },
    focusHandler() {
      this.isAutosuggestOpen = true
    },
    async addPokemonToTeam(pokemon: NamedAPIResourceList["results"][0]) {
      this.isLoading = true
      const response = await this.pokemonStore.addPokemonToTeam(pokemon, this.side)
      if (response) {
        this.$emit("close")
        return
      }
      // TODO: handle error case
      console.warn("Failed to add pokemon")
      this.$emit("close")
    },
  },
})
</script>
