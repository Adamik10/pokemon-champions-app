// src/services/pokeApi.ts
import { PokemonClient } from "pokenode-ts"

const api = new PokemonClient()

export const pokeApi = {
  getPokemonByName(name: string) {
    return api.getPokemonByName(name)
  },
  getPokemonById(id: number) {
    return api.getPokemonById(id)
  },
  getPokemonSpeciesById(id: number) {
    return api.getPokemonSpeciesById(id)
  },
}
