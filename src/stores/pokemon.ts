import { defineStore } from "pinia"
import type { Pokemon } from "pokenode-ts"

import { pokeApi } from "@/services/pokeApi"

export type PokemonAutosuggestResult = {
  name: string
  url: string
}

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemon: {} as Record<string, Pokemon>,
    playerTeam: [] as Pokemon[],
    opponentTeam: [] as string[],
    loading: false,
  }),

  actions: {
    async getPokemonByName(name: string) {
      if (this.pokemon[name]) return this.pokemon[name]
      this.loading = true
      try {
        const data = await pokeApi.getPokemonByName(name)
        this.pokemon[name] = data
        return data
      } finally {
        this.loading = false
      }
    },
    async getPokemonById(id: number) {
      if (this.pokemon[id]) return this.pokemon[id]
      this.loading = true
      try {
        const data = await pokeApi.getPokemonById(id)
        this.pokemon[id] = data
        return data
      } finally {
        this.loading = false
      }
    },
    async getAllPokemon() {
      this.loading = true
      try {
        const data = await pokeApi.getAllPokemon()
        return data?.results as PokemonAutosuggestResult[]
      } finally {
        this.loading = false
      }
    },
  },
})
