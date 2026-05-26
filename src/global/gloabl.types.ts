import type { Item, Move, NamedAPIResourceList, Nature, Pokemon, PokemonSpecies } from "pokenode-ts"

import { stats } from "@/global/global.consts"

export type Side = "player" | "opponent"

export type SpritePokemon = Pokemon | NamedAPIResourceList["results"][0]

export type Stat = {
  base: number
  evs: number
  actualStat: number
}
export type Stats = {
  [stats.hp.key]: Stat
  [stats.attack.key]: Stat
  [stats.defense.key]: Stat
  [stats.spAttack.key]: Stat
  [stats.spDefense.key]: Stat
  [stats.speed.key]: Stat
}

export type Natures =
  | "Serious"
  | "Hardy"
  | "Docile"
  | "Bashful"
  | "Quirky"
  | "Lonely"
  | "Adamant"
  | "Naughty"
  | "Brave"
  | "Bold"
  | "Impish"
  | "Lax"
  | "Relaxed"
  | "Modest"
  | "Mild"
  | "Rash"
  | "Quiet"
  | "Calm"
  | "Gentle"
  | "Careful"
  | "Sassy"
  | "Timid"
  | "Hasty"
  | "Jolly"
  | "Naive"

export type PersonalizedPokemon = {
  pokemon: Pokemon
  species: PokemonSpecies
  ability: Pokemon["abilities"][0]
  item: Item | null
  moves: Move[]
  nature: Nature | null
  stats: Stats
}
