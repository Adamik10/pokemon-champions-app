export type FormattedPokemonName = {
  prefix?: string
  base: string
  suffix?: string
}

export function formatPokemonName(name: string): FormattedPokemonName {
  const parts = name.split("-")

  const megaIndex = parts.indexOf("mega")

  // Non-mega Pokémon
  if (megaIndex === -1) {
    return {
      base: parts.join(" "),
    }
  }

  const base = parts.slice(0, megaIndex).join(" ")
  const megaSuffix = parts.slice(megaIndex + 1).join(" ")

  return {
    prefix: "Mega",
    base,
    suffix: megaSuffix ? megaSuffix.toUpperCase() : undefined,
  }
}
