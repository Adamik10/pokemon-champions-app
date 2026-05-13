import "pokenode-ts"

declare module "pokenode-ts" {
  interface OtherPokemonSprites {
    showdown?: Showdown
  }

  interface Showdown {
    front_default: string | null
    front_shiny: string | null
    back_default: string | null
    back_shiny: string | null
  }
}
