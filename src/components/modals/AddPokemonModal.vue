<template>
  <div class="flex h-full w-full flex-col">
    <div class="relative h-auto w-full">
      <input
        name="search"
        ref="inputRef"
        type="text"
        class="bg-base-lilac h-8 w-full px-3 text-white focus:border-0 focus:outline-0"
        v-model="search"
        @focus="focusHandler" />
      <div
        v-if="isAutosuggestOpen"
        class="border-base-lilac absolute top-8 h-auto w-full rounded-br-3xl rounded-bl-sm
          border-t-0 border-r border-b border-l bg-white shadow-lg">
        <ul class="flex max-h-80 flex-col overflow-y-scroll">
          <li
            v-for="pokemon in filteredPokemon"
            :key="pokemon.name"
            class="text-headline text-base-purple flex items-center px-4 capitalize">
            <img
              :src="getImageUrl(pokemon)"
              :alt="`${pokemon.name} image`"
              class="mr-2 inline h-10 w-10 bg-cover"
              @error="setMissingNo" />
            <span>{{ formatName(pokemon.name) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue"

import { type PokemonAutosuggestResult, usePokemonStore } from "@/stores/pokemon"

export default defineComponent({
  name: "AddPokemonModal",
  props: {
    exampleProp: String,
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
    getImageUrl(pokemon: PokemonAutosuggestResult): string {
      const extractedId = (url: string): string => {
        return url.split("/").filter(Boolean).pop() || ""
      }
      const pokemonName = pokemon.name
      // megas + gmax forms
      if (pokemonName.includes("-mega") || pokemonName.includes("-gmax")) {
        const baseName = pokemonName.replace(/-mega(-[xyz])?$/, "").replace(/-gmax$/, "")
        const basePokemon = this.allPokemon.find(p => p.name === baseName)
        if (basePokemon && pokemonName.includes("mega")) {
          const megaSuffix = pokemonName.match(/mega(-[xyz])?$/)?.[0] || "mega"
          return `https://s3.pokeos.com/pokeos-uploads/assets/pokemon/home/${extractedId(basePokemon.url)}-${megaSuffix}.png?v=7`
        }
        if (basePokemon && pokemonName.includes("gmax")) {
          return `https://s3.pokeos.com/pokeos-uploads/assets/pokemon/home/render/${extractedId(basePokemon.url)}-gmax.png?v=7`
        }
      }
      // regional forms
      const regionalForms = ["alola", "galar", "hisui", "paldea"]
      const matchedForm = regionalForms.find(form => pokemonName.includes(`-${form}`))
      if (matchedForm) {
        const baseName = pokemonName.replace(`-${matchedForm}`, "")
        const basePokemon = this.allPokemon.find(p => p.name === baseName)
        if (basePokemon) {
          return `https://s3.pokeos.com/pokeos-uploads/assets/pokemon/home/${extractedId(basePokemon.url)}-regional-${matchedForm.charAt(0)}.png?v=7`
        }
      }
      // default image
      return `https://s3.pokeos.com/pokeos-uploads/assets/pokemon/home/${extractedId(pokemon.url)}.png?v=7`
    },
    setMissingNo(event: Event) {
      const target = event.target as HTMLImageElement
      target.src = "https://www.pokeos.com/src/misc/missingno.gif"
    },
  },
})
</script>
