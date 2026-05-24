import { defineStore } from "pinia"
import type { NamedAPIResourceList, Pokemon } from "pokenode-ts"

import type { PersonalizedPokemon, Side } from "@/global/gloabl.types"
import { itemApi } from "@/services/itemApi"
import { moveApi } from "@/services/moveApi"
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
    // ---------------- Pokemon -----------------
    initPokemon(pokemon: Pokemon): PersonalizedPokemon {
      return {
        pokemon: pokemon,
        ability: pokemon.abilities[0],
        item: null,
        moves: [],
      }
    },
    async addPokemonToTeam(
      pokemon: NamedAPIResourceList["results"][0],
      team: Side
    ): Promise<boolean> {
      const data = await pokeApi.getPokemonByUrl(pokemon.url)
      if (!data) return false
      const initializedPokemon = this.initPokemon(data)
      if (team === "player") {
        this.playerTeam.push(initializedPokemon)
        this.activePokemonPlayer = initializedPokemon
      } else if (team === "opponent") {
        this.opponentTeam.push(initializedPokemon)
        this.activePokemonOpponent = initializedPokemon
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
        return data?.results as NamedAPIResourceList["results"][0][]
      } finally {
        this.loading = false
      }
    },
    // ---------------- Items -----------------
    async getAllItems() {
      this.loading = true
      try {
        const data = await itemApi.getAllItems()
        return data?.results as NamedAPIResourceList["results"][0][]
      } finally {
        this.loading = false
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
      this.loading = true
      try {
        const data = await moveApi.getAllMoves()
        return data?.results as NamedAPIResourceList["results"][0][]
      } finally {
        this.loading = false
      }
    },
    async addMoveToActivePokemon(
      move: NamedAPIResourceList["results"][0],
      team: Side,
      moveSlot: number
    ): Promise<Boolean> {
      if (!this.activePokemonPlayer) return false
      const data = await moveApi.getMoveByName(move.name)
      console.log({ data })

      if (!data) return false
      if (team === "player") {
        this.activePokemonPlayer.moves[moveSlot - 1] = data
      } else if (team === "opponent") {
        this.activePokemonOpponent!.moves[moveSlot - 1] = data
      }
      console.log("added move", this.activePokemonPlayer)
      return true
    },
  },
})
