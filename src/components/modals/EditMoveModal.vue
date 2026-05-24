<template>
  <div class="flex h-[80vh] w-full flex-col">
    <div class="relative h-full w-full">
      <input
        name="search"
        ref="inputRef"
        type="text"
        class="bg-base-lilac h-8 w-full px-3 text-white focus:border-0 focus:outline-0"
        :value="search"
        :disabled="isLoading"
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
            v-for="(move, index) in filteredMoves"
            :key="move.name"
            class="text-headline text-base-purple flex items-center px-4 py-0.5 capitalize"
            :class="index % 2 === 0 ? 'bg-base-lilac/10' : ''"
            @click="addMoveToActivePokemon(move)">
            <div class="flex items-end gap-1">
              <span>{{ move.name.replace("-", " ") }}</span>
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
  name: "EditMoveModal",
  components: {
    PokemonSprite,
    LoadingSpinner,
  },
  props: {
    side: {
      type: String as () => Side,
      required: true,
    },
    moveSlot: {
      type: Number,
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
      allMoves: [] as NamedAPIResourceList["results"][0][],
      search: "",
    }
  },
  computed: {
    filteredMoves(): NamedAPIResourceList["results"][0][] {
      if (!this.search) {
        return this.allMoves
      }
      return this.allMoves.filter(move =>
        move.name.toLowerCase().replace("-", " ").includes(this.search.toLowerCase())
      )
    },
  },
  mounted() {
    this.getallMoves()
    nextTick(() => {
      const input = this.$refs.inputRef as HTMLInputElement
      input?.focus()
    })
  },
  methods: {
    getallMoves() {
      this.isLoading = true
      this.pokemonStore
        .getAllMoves()
        .then(data => {
          this.allMoves = data
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    focusHandler() {
      this.isAutosuggestOpen = true
    },
    async addMoveToActivePokemon(move: NamedAPIResourceList["results"][0]) {
      this.isLoading = true
      const reponse = await this.pokemonStore.addMoveToActivePokemon(move, this.side, this.moveSlot)
      if (reponse) {
        this.isLoading = false
        this.$emit("close")
        return
      }
      // TODO: handle error case
      console.warn("Failed to add move")
      this.isLoading = false
      this.$emit("close")
    },
  },
})
</script>
