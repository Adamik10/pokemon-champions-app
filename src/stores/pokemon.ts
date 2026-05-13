import { defineStore } from "pinia"
import type { Pokemon } from "pokenode-ts"

import type { PersonalizedPokemon, PokemonAutosuggestResult, Side } from "@/global/gloabl.types"
import { pokeApi } from "@/services/pokeApi"

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemon: {} as Record<string, Pokemon>,
    playerTeam: [] as PersonalizedPokemon[],
    opponentTeam: [] as PersonalizedPokemon[],
    activePokemonPlayer: null as PersonalizedPokemon | null,
    activePokemonOpponent: null as PersonalizedPokemon | null,
    loading: false,
  }),

  actions: {
    initPokemon(pokemon: Pokemon): PersonalizedPokemon {
      return {
        pokemon: pokemon,
        ability: pokemon.abilities[0],
        item: null,
      }
    },
    async addPokemonToTeam(pokemon: PokemonAutosuggestResult, team: Side) {
      const data = await pokeApi.getPokemonByUrl(pokemon.url)
      const initializedPokemon = this.initPokemon(data)
      if (team === "player") {
        this.playerTeam.push(initializedPokemon)
        this.activePokemonPlayer = initializedPokemon
      } else if (team === "opponent") {
        this.opponentTeam.push(initializedPokemon)
        this.activePokemonOpponent = initializedPokemon
      }
    },
    setActivePokemon(pokemon: PersonalizedPokemon, team: Side) {
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
