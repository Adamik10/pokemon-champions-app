import type { Nature, Pokemon } from "pokenode-ts"

import type { Stat, Stats } from "@/global/gloabl.types"
import { stats } from "@/global/global.consts"

export type FormattedPokemonName = {
  prefix?: string
  base: string
  suffix?: string
}

export function formatPokemonName(name: string): FormattedPokemonName {
  const protectedName = name.toLowerCase().replace("mo-o", "mo_o")
  const parts = protectedName.split("-")
  const restore = (value: string) => value.replace("mo_o", "mo-o")

  const megaIndex = parts.indexOf("mega")

  // Non-mega Pokémon
  if (megaIndex === -1) {
    return {
      base: parts.map(restore).join(" "),
    }
  }

  const base = parts.slice(0, megaIndex).map(restore).join(" ")
  const megaSuffix = parts.slice(megaIndex + 1).join(" ")

  return {
    prefix: "Mega",
    base,
    suffix: megaSuffix ? megaSuffix.toUpperCase() : undefined,
  }
}

export function createInitialStats(pokemon: Pokemon): Stats {
  const matchStat = (name: string) => {
    return pokemon.stats.find(stat => stat.stat.name === name)
  }
  return {
    [stats.hp.key]: {
      base: matchStat(stats.hp.APIName)?.base_stat || 0,
      actualStat: calculateStat(
        stats.hp.APIName,
        matchStat(stats.hp.APIName)?.base_stat || 0,
        0,
        null
      ),
      evs: 0,
    },
    [stats.attack.key]: {
      base: matchStat(stats.attack.APIName)?.base_stat || 0,
      actualStat: calculateStat(
        stats.hp.APIName,
        matchStat(stats.attack.APIName)?.base_stat || 0,
        0,
        null
      ),
      evs: 0,
    },
    [stats.defense.key]: {
      base: matchStat(stats.defense.APIName)?.base_stat || 0,
      actualStat: calculateStat(
        stats.hp.APIName,
        matchStat(stats.defense.APIName)?.base_stat || 0,
        0,
        null
      ),
      evs: 0,
    },
    [stats.spAttack.key]: {
      base: matchStat(stats.spAttack.APIName)?.base_stat || 0,
      actualStat: calculateStat(
        stats.hp.APIName,
        matchStat(stats.spAttack.APIName)?.base_stat || 0,
        0,
        null
      ),
      evs: 0,
    },
    [stats.spDefense.key]: {
      base: matchStat(stats.spDefense.APIName)?.base_stat || 0,
      actualStat: calculateStat(
        stats.hp.APIName,
        matchStat(stats.spDefense.APIName)?.base_stat || 0,
        0,
        null
      ),
      evs: 0,
    },
    [stats.speed.key]: {
      base: matchStat(stats.speed.APIName)?.base_stat || 0,
      actualStat: calculateStat(
        stats.hp.APIName,
        matchStat(stats.speed.APIName)?.base_stat || 0,
        0,
        null
      ),
      evs: 0,
    },
  }
}

export function calculateStat(
  statName: string,
  baseStat: Stat["base"],
  evs: Stat["evs"],
  nature: Nature | null
) {
  const level = 50
  const baseValue = Math.floor(((2 * baseStat + evs / 4) * level) / 100)

  // HP formula
  if (statName === stats.hp.APIName) {
    return baseValue + level + 10
  }
  let natureModifier = 1
  if (nature && statName === nature.increased_stat?.name) {
    natureModifier = 1.1
  } else if (nature && statName === nature.decreased_stat?.name) {
    natureModifier = 0.9
  }
  // Other stats formula
  return Math.floor((baseValue + 5) * natureModifier)
}
