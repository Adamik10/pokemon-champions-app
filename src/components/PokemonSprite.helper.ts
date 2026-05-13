import type { PokemonAutosuggestResult, SpritePokemon } from "@/global/gloabl.types"

type PokemonImageType = "sprite" | "render" | "animated-render"

export function getPokemonImageUrl(
  pokemon: SpritePokemon,
  type: PokemonImageType = "sprite",
  allPokemon?: PokemonAutosuggestResult[]
): string[] {
  const extractedId = (url: string): string => {
    return url.split("/").filter(Boolean).pop() || ""
  }
  const getBaseSpeciesId = () => {
    // Full Pokemon object from PokeAPI
    if ("species" in pokemon && pokemon.species?.url) {
      return extractedId(pokemon.species.url)
    }
    // Autosuggest result
    if ("url" in pokemon && pokemon.url) {
      return extractedId(pokemon.url)
    }
    return ""
  }
  const pokemonName = pokemon.name
  const getBasePath = () => {
    switch (type) {
      case "render":
        return "https://s3.pokeos.com/pokeos-uploads/assets/pokemon/home/render"
      case "animated-render":
        return "https://s3.pokeos.com/pokeos-uploads/assets/pokemon/home/animated"
      case "sprite":
      default:
        return "https://s3.pokeos.com/pokeos-uploads/assets/pokemon/home"
    }
  }
  const extension = type === "animated-render" ? "gif" : "png"
  const basePath = getBasePath()

  const buildPrimaryUrl = (): string => {
    // special exceptions
    const specialAnimatedRenders: Record<string, string> = {
      meganium: "154-meganium",
    }
    if (type === "animated-render") {
      const specialPath = specialAnimatedRenders[pokemonName]
      if (specialPath) {
        return `${basePath}/${specialPath}.${extension}?v=7`
      }
    }

    // megas + gmax forms
    if (pokemonName.includes("-mega") || pokemonName.includes("-gmax")) {
      const baseName = pokemonName.replace(/-mega(-[xyz])?$/, "").replace(/-gmax$/, "")
      let basePokemon
      if (allPokemon) {
        basePokemon = allPokemon.find(p => p.name === baseName)
      } else if ("species" in pokemon && pokemon.species?.url) {
        basePokemon = pokemon.species
      }
      if (basePokemon && pokemonName.includes("mega")) {
        const megaSuffix = pokemonName.match(/mega(-[xyz])?$/)?.[0] || "mega"
        return `${basePath}/${extractedId(basePokemon.url)}-${megaSuffix}.${extension}?v=7`
      }
      if (basePokemon && pokemonName.includes("gmax")) {
        return `${basePath}/${extractedId(basePokemon.url)}-gmax.${extension}?v=7`
      }
    }

    // regional forms
    const regionalForms = ["alola", "galar", "hisui", "paldea"]
    const matchedForm = regionalForms.find(form => pokemonName.includes(`-${form}`))
    if (matchedForm) {
      const baseName = pokemonName.replace(`-${matchedForm}`, "")
      let basePokemon
      if (allPokemon) {
        basePokemon = allPokemon.find(p => p.name === baseName)
      } else if ("species" in pokemon && pokemon.species?.url) {
        basePokemon = pokemon.species
      }
      if (basePokemon) {
        return `${basePath}/${extractedId(basePokemon.url)}-regional-${matchedForm.charAt(0)}.${extension}?v=7`
      }
    }
    // default
    return `${basePath}/${getBaseSpeciesId()}.${extension}?v=7`
  }

  const primary = buildPrimaryUrl()
  const fallbacks: string[] = [primary]

  if (type === "sprite" && "sprites" in pokemon) {
    const home = pokemon.sprites?.other?.home?.front_default
    if (home) fallbacks.push(home)
  }
  if (type === "animated-render" && "sprites" in pokemon) {
    const showdown = pokemon.sprites?.other?.showdown?.front_default
    if (showdown) fallbacks.push(showdown)
    const home = pokemon.sprites?.other?.home?.front_default
    if (home) fallbacks.push(home)
  }
  fallbacks.push("https://www.pokeos.com/src/misc/missingno.gif")

  return fallbacks
}
