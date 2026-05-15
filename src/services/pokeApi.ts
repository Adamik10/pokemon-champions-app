import { type NamedAPIResourceList, type Pokemon, PokemonClient, UtilityClient } from "pokenode-ts"

const api = new PokemonClient()
const utilityApi = new UtilityClient()

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
  getPokemonByUrl(url: string) {
    return utilityApi.getResourceByUrl(url) as Promise<Pokemon>
  },
  getAllPokemon() {
    return utilityApi.getResourceByUrl(
      "https://pokeapi.co/api/v2/pokemon/?limit=20000"
    ) as Promise<NamedAPIResourceList>
  },
}
