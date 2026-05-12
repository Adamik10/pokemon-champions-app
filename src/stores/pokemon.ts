import { defineStore } from "pinia"
import type { Pokemon } from "pokenode-ts"

import type { PokemonAutosuggestResult, Side } from "@/global/gloabl.types"
import { pokeApi } from "@/services/pokeApi"

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemon: {} as Record<string, Pokemon>,
    playerTeam: [] as Pokemon[],
    opponentTeam: [] as string[],
    activePokemonPlayer: null as Pokemon | null,
    activePokemonOpponent: null as Pokemon | null,
    loading: false,
  }),

  actions: {
    async addPokemonToTeam(pokemon: PokemonAutosuggestResult, team: Side) {
      const data = await pokeApi.getPokemonByUrl(pokemon.url)
      if (team === "player") {
        this.playerTeam.push(data)
        this.activePokemonPlayer = data
      } else if (team === "opponent") {
        this.opponentTeam.push(data.name)
        this.activePokemonOpponent = data
      }
    },
    setActivePokemon(pokemon: Pokemon, team: Side) {
      if (team === "player") {
        this.activePokemonPlayer = pokemon
      } else if (team === "opponent") {
        this.activePokemonOpponent = pokemon
      }
    },
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
