// src/services/pokeApi.ts
import { PokemonClient, UtilityClient } from "pokenode-ts"

const api = new PokemonClient()
const utilityApi = new UtilityClient()
export type getAllPokemonResponse = {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: String
    url: String
  }[]
}

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
  getAllPokemon() {
    return utilityApi.getResourceByUrl(
      "https://pokeapi.co/api/v2/pokemon/?limit=20000"
    ) as Promise<getAllPokemonResponse>
  },
}
