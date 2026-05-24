import type { Item, Move, NamedAPIResourceList, Pokemon } from "pokenode-ts"

export type Side = "player" | "opponent"

export type SpritePokemon = Pokemon | NamedAPIResourceList["results"][0]

export type PersonalizedPokemon = {
  pokemon: Pokemon
  ability: Pokemon["abilities"][0]
  item: Item | null
  moves: Move[]
}
