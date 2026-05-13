import type { Pokemon } from "pokenode-ts"

export type Side = "player" | "opponent"

export type PokemonAutosuggestResult = {
  name: string
  url: string
}

export type SpritePokemon = Pokemon | PokemonAutosuggestResult

export type PersonalizedPokemon = {
  pokemon: Pokemon
  ability: Pokemon["abilities"][0]
  item: Pokemon["held_items"][0] | null
}
