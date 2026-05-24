import { ItemClient, type NamedAPIResourceList, UtilityClient } from "pokenode-ts"

const api = new ItemClient()
const utilityApi = new UtilityClient()

export const itemApi = {
  getAllItems() {
    return utilityApi.getResourceByUrl(
      "https://pokeapi.co/api/v2/item/?limit=20000"
    ) as Promise<NamedAPIResourceList>
  },
  getItemByName(name: string) {
    return api.getItemByName(name)
  },
  getItemCategoryByName(name: string) {
    return api.getItemCategoryByName(name)
  },
}
