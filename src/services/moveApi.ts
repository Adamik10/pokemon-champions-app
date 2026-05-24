import { MoveClient, type NamedAPIResourceList, UtilityClient } from "pokenode-ts"

const api = new MoveClient()
const utilityApi = new UtilityClient()

export const moveApi = {
  getAllMoves() {
    return utilityApi.getResourceByUrl(
      "https://pokeapi.co/api/v2/move/?limit=20000"
    ) as Promise<NamedAPIResourceList>
  },
  getMoveByName(name: string) {
    return api.getMoveByName(name)
  },
}
