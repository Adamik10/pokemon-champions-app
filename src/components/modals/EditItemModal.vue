<template>
  <div class="flex h-[80vh] w-full flex-col">
    <div class="relative h-full w-full">
      <input
        name="search"
        ref="inputRef"
        type="text"
        class="bg-base-lilac h-8 w-full px-3 text-white focus:border-0 focus:outline-0"
        :value="search"
        @input="search = ($event.target as HTMLInputElement).value"
        @focus="focusHandler" />
      <div
        v-if="isAutosuggestOpen"
        class="border-base-lilac absolute top-8 max-h-9/10 w-full overflow-y-scroll rounded-br-3xl
          rounded-bl-sm border-t-0 border-r border-b border-l bg-white shadow-lg">
        <div v-if="isLoading" class="flex min-h-32 items-center justify-center">
          <LoadingSpinner color="base-lilac" />
        </div>
        <ul v-else class="flex h-full flex-col">
          <li
            v-for="(item, index) in filteredItems"
            :key="item.name"
            class="text-headline text-base-purple flex items-center px-4 py-0.5 capitalize"
            :class="index % 2 === 0 ? 'bg-base-lilac/10' : ''"
            @click="addItemToActivePokemon(item)">
            <div class="flex items-end gap-1">
              <span>{{ item.name.replace("-", " ") }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { NamedAPIResourceList } from "pokenode-ts"
import { defineComponent, nextTick } from "vue"

import PokemonSprite from "@/components/PokemonSprite.vue"
import LoadingSpinner from "@/components/UI/LoadingSpinner.vue"
import type { Side } from "@/global/gloabl.types"
import { usePokemonStore } from "@/stores/pokemon"

export default defineComponent({
  name: "EditItemModal",
  components: {
    PokemonSprite,
    LoadingSpinner,
  },
  props: {
    side: {
      type: String as () => Side,
      required: true,
    },
  },
  emits: ["close"],
  setup() {
    return {
      pokemonStore: usePokemonStore(),
    }
  },
  data() {
    return {
      isLoading: false,
      isAutosuggestOpen: true,
      allItems: [] as NamedAPIResourceList["results"][0][],
      search: "",
    }
  },
  computed: {
    filteredItems(): NamedAPIResourceList["results"][0][] {
      if (!this.search) {
        return this.allItems
      }
      return this.allItems.filter(item =>
        item.name.toLowerCase().replace("-", " ").includes(this.search.toLowerCase())
      )
    },
  },
  mounted() {
    this.getallItems()
    nextTick(() => {
      this.focusInput()
    })
  },
  watch: {
    isLoading(newValue) {
      if (!newValue) {
        nextTick(() => {
          this.focusInput()
        })
      }
    },
  },
  methods: {
    getallItems() {
      this.isLoading = true
      this.pokemonStore
        .getAllItems()
        .then(data => {
          this.allItems = data
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    focusInput() {
      const input = this.$refs.inputRef as HTMLInputElement
      input?.focus()
    },
    focusHandler() {
      this.isAutosuggestOpen = true
    },
    async addItemToActivePokemon(item: NamedAPIResourceList["results"][0]) {
      this.isLoading = true
      const response = await this.pokemonStore.addItemToActivePokemon(item, this.side)
      if (response) {
        this.$emit("close")
        return
      }
      // TODO: handle error case
      console.warn("Failed to add item")
      this.$emit("close")
    },
  },
})
</script>
