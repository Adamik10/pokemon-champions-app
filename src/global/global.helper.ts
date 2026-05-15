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
