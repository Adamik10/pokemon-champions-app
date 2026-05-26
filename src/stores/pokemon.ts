import { defineStore } from "pinia"
import type { NamedAPIResourceList, Pokemon, PokemonSpecies } from "pokenode-ts"

import type { PersonalizedPokemon, Side } from "@/global/gloabl.types"
import { createInitialStats } from "@/global/global.helper"
import { itemApi } from "@/services/itemApi"
import { moveApi } from "@/services/moveApi"
import { pokeApi } from "@/services/pokeApi"

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemon: {} as Record<string, Pokemon>, // used as a caching layer 4 pkm data
    playerTeam: [] as PersonalizedPokemon[],
    opponentTeam: [] as PersonalizedPokemon[],
    activePokemonPlayer: null as PersonalizedPokemon | null,
    activePokemonOpponent: null as PersonalizedPokemon | null,
    isLoading: false,
  }),

  actions: {
    // ---------------- Team Management -----------------
    initPokemon(pokemon: Pokemon, species: PokemonSpecies): PersonalizedPokemon {
      return {
        pokemon: pokemon,
        species: species,
        ability: pokemon.abilities[0],
        item: null,
        moves: [],
        nature: null,
        stats: createInitialStats(pokemon),
      }
    },
    async addPokemonToTeam(
      pokemon: NamedAPIResourceList["results"][0],
      team: Side
    ): Promise<boolean> {
      const data = await pokeApi.getPokemonByUrl(pokemon.url)
      if (!data) return false
      const speciesData = await pokeApi.getPokemonSpeciesByName(data.species.name)
      if (!speciesData) return false
      const initializedPokemon = this.initPokemon(data, speciesData)
      if (team === "player") {
        this.playerTeam.push(initializedPokemon)
        this.activePokemonPlayer = initializedPokemon
      } else if (team === "opponent") {
        this.opponentTeam.push(initializedPokemon)
        this.activePokemonOpponent = initializedPokemon
      }
      if (initializedPokemon.pokemon.name.includes("-mega")) {
        await this.autoAddMegaStone(initializedPokemon, team)
      }
      return true
    },
    setActivePokemon(pokemon: PersonalizedPokemon, team: Side) {
      if (team === "player") {
        this.activePokemonPlayer = pokemon
      } else if (team === "opponent") {
        this.activePokemonOpponent = pokemon
      }
    },
    async autoAddMegaStone(pokemon: PersonalizedPokemon, team: Side): Promise<boolean> {
      const response = await itemApi.getItemCategoryByName("mega-stones")
      const pokemonNameBase = pokemon.species.name.slice(0, 5)
      const megaStoneItem = response.items.find(item => {
        const includesPokemonNameBase = item.name.includes(pokemonNameBase)
        let megaXYZSuffix = null
        if (pokemon.pokemon.name.includes("-mega-x")) {
          megaXYZSuffix = "-x"
        } else if (pokemon.pokemon.name.includes("-mega-y")) {
          megaXYZSuffix = "-y"
        } else if (pokemon.pokemon.name.includes("-mega-z")) {
          megaXYZSuffix = "-z"
        }
        return includesPokemonNameBase && (!megaXYZSuffix || item.name.includes(megaXYZSuffix))
      })
      if (!megaStoneItem) return false
      const responseAddingItem = await this.addItemToActivePokemon(megaStoneItem, team)
      if (responseAddingItem) return true
      return false
    },
    // ---------------- Pokemon -----------------
    async getPokemonByName(name: string) {
      if (this.pokemon[name]) return this.pokemon[name]
      this.isLoading = true
      try {
        const data = await pokeApi.getPokemonByName(name)
        this.pokemon[name] = data
        return data
      } finally {
        this.isLoading = false
      }
    },
    async getPokemonById(id: number) {
      if (this.pokemon[id]) return this.pokemon[id]
      this.isLoading = true
      try {
        const data = await pokeApi.getPokemonById(id)
        this.pokemon[id] = data
        return data
      } finally {
        this.isLoading = false
      }
    },
    async getAllPokemon() {
      this.isLoading = true
      try {
        const data = await pokeApi.getAllPokemon()
        return data?.results as NamedAPIResourceList["results"][0][]
      } finally {
        this.isLoading = false
      }
    },
    // ---------------- Items -----------------
    async getAllItems() {
      this.isLoading = true
      try {
        const data = await itemApi.getAllItems()
        return data?.results as NamedAPIResourceList["results"][0][]
      } finally {
        this.isLoading = false
      }
    },
    async addItemToActivePokemon(
      item: NamedAPIResourceList["results"][0],
      team: Side
    ): Promise<Boolean> {
      if (!this.activePokemonPlayer) {
        return false
      }
      const data = await itemApi.getItemByName(item.name)
      if (!data) return false
      if (team === "player") {
        this.activePokemonPlayer.item = data
      } else if (team === "opponent") {
        this.activePokemonOpponent!.item = data
      }
      return true
    },
    // ---------------- Moves -----------------
    async getAllMoves() {
      this.isLoading = true
      try {
        const data = await moveApi.getAllMoves()
        return data?.results as NamedAPIResourceList["results"][0][]
      } finally {
        this.isLoading = false
      }
    },
    async addMoveToActivePokemon(
      move: NamedAPIResourceList["results"][0],
      team: Side,
      moveSlot: number
    ): Promise<Boolean> {
      if (!this.activePokemonPlayer) return false
      const data = await moveApi.getMoveByName(move.name)
      if (!data) return false
      if (team === "player") {
        this.activePokemonPlayer.moves[moveSlot - 1] = data
      } else if (team === "opponent") {
        this.activePokemonOpponent!.moves[moveSlot - 1] = data
      }
      return true
    },
  },
})
