import type { PokemonAutosuggestResult, SpritePokemon } from "@/global/gloabl.types"

export function getPokemonSpriteUrl(
  pokemon: SpritePokemon,
  allPokemon?: PokemonAutosuggestResult[]
): string {
  const extractedId = (url: string): string => {
    return url.split("/").filter(Boolean).pop() || ""
  }
  const getId = () => {
    if ("id" in pokemon) {
      return pokemon.id.toString()
    }
    return extractedId(pokemon.url)
  }
  const pokemonName = pokemon.name

  // megas + gmax forms
  if (pokemonName.includes("-mega") || pokemonName.includes("-gmax")) {
    const baseName = pokemonName.replace(/-mega(-[xyz])?$/, "").replace(/-gmax$/, "")
    const basePokemon = allPokemon?.find(p => p.name === baseName)
    if (basePokemon && pokemonName.includes("mega")) {
      const megaSuffix = pokemonName.match(/mega(-[xyz])?$/)?.[0] || "mega"
      return `https://s3.pokeos.com/pokeos-uploads/assets/pokemon/home/${extractedId(basePokemon.url)}-${megaSuffix}.png?v=7`
    }
    if (basePokemon && pokemonName.includes("gmax")) {
      return `https://s3.pokeos.com/pokeos-uploads/assets/pokemon/home/render/${extractedId(basePokemon.url)}-gmax.png?v=7`
    }
  }

  // regional forms
  const regionalForms = ["alola", "galar", "hisui", "paldea"]
  const matchedForm = regionalForms.find(form => pokemonName.includes(`-${form}`))
  if (matchedForm) {
    const baseName = pokemonName.replace(`-${matchedForm}`, "")
    const basePokemon = allPokemon?.find(p => p.name === baseName)
    if (basePokemon) {
      return `https://s3.pokeos.com/pokeos-uploads/assets/pokemon/home/${extractedId(basePokemon.url)}-regional-${matchedForm.charAt(0)}.png?v=7`
    }
  }

  // default
  return `https://s3.pokeos.com/pokeos-uploads/assets/pokemon/home/${getId()}.png?v=7`
}
