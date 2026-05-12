import type { Pokemon } from "pokenode-ts"

export type Side = "player" | "opponent"

export type PokemonAutosuggestResult = {
  name: string
  url: string
}

export type SpritePokemon = Pokemon | PokemonAutosuggestResult
