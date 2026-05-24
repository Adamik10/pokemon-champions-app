<template>
  <div class="relative flex w-full flex-col gap-2 bg-white px-0.5 pt-2 pb-3">
    <!-- Team selection -->
    <ActiveTeam :team="activeTeam" />

    <div class="flex w-full">
      <!-- Image -->
      <div class="flex w-1/3 flex-col items-center gap-1">
        <div class="relative aspect-square w-3/4 max-w-3/4 items-center justify-center">
          <PokemonRender :pokemon="activePokemon?.pokemon" />
          <div
            v-if="activePokemon"
            class="bg-base-lilac absolute -right-2 bottom-0 flex h-8 w-8 items-center justify-center
              overflow-visible rounded-full border-2 border-white">
            <img
              v-if="activePokemon?.item"
              :src="activePokemon.item.sprites.default"
              :alt="
                activePokemon.item.names.find(name => name.language.name === 'en')?.name ||
                activePokemon.item.name ||
                'item image'
              "
              @click="openEditItemModal()" />
            <PlusIcon v-else @click="openEditItemModal()" />
          </div>
        </div>
        <!-- Ability + Item -->
        <KeyValueText
          category="ability"
          :value="activePokemon ? activePokemon.ability.ability.name.replace('-', ' ') : '-'"
          width-class="w-9/10 mr-auto" />
        <KeyValueText
          category="Item"
          :value="
            activePokemon
              ? activePokemon.item
                ? activePokemon.item.name.replace('-', ' ')
                : 'Select item'
              : '-'
          "
          @click="openEditItemModal()"
          width-class="w-9/10 mr-auto" />
      </div>

      <!-- Name -->
      <div class="flex w-1/3 flex-col gap-1">
        <div
          v-if="activePokemon"
          class="text-headline -mb-px -ml-5 flex items-end overflow-hidden capitalize">
          <span
            v-if="formatPokemonName(activePokemon.pokemon.name).prefix"
            class="text-sm leading-none">
            {{ formatPokemonName(activePokemon.pokemon.name).prefix }}
          </span>
          <span>
            {{ formatPokemonName(activePokemon.pokemon.name).base }}
          </span>
          <span v-if="formatPokemonName(activePokemon.pokemon.name).suffix" class="ml-0.5">
            {{ formatPokemonName(activePokemon.pokemon.name).suffix }}
          </span>
        </div>
        <div v-else class="text-headline -mb-px -ml-5">???</div>

        <!-- Typing -->
        <div class="-ml-3 flex w-full gap-1">
          <TypeLabel :type="activePokemonPrimaryType || undefined" />
          <TypeLabel
            v-if="!activePokemon || activePokemonSecondaryType"
            :type="activePokemonSecondaryType || undefined" />
        </div>

        <!-- Moves -->
        <div class="mt-1 flex w-9/10 flex-col gap-1.5">
          <MoveLabel
            v-for="move in 4"
            :key="move"
            :move-slot="move"
            :move="activePokemon?.moves[move - 1]"
            team="player"
            :pokemon="activePokemon?.pokemon" />
        </div>
      </div>
      <!-- Stats section -->
      <div class="w-1/3">
        <StatsSection />
      </div>
    </div>
    <div class="absolute -bottom-3 left-1 flex gap-1.5">
      <ActionButton
        v-for="actionButton in pokemonActionButtons"
        :key="actionButton"
        :action="actionButton" />
    </div>
  </div>
</template>

<script lang="ts">
import PlusIcon from "@/assets/PlusIcon.vue"
import ActiveTeam from "@/components/ActiveTeam.vue"
import StatsSection from "@/components/StatsSection.vue"
import KeyValueText from "@/components/UI/KeyValueText.vue"
import MoveLabel from "@/components/UI/MoveLabel.vue"
import PokemonRender from "@/components/UI/PokemonRender.vue"
import type { PokemonType } from "@/components/UI/TypeIcon.vue"
import TypeLabel from "@/components/UI/TypeLabel.vue"
import ActionButton from "@/components/buttons/ActionButton.vue"
import type { PersonalizedPokemon } from "@/global/gloabl.types"
import { pokemonActionButtons } from "@/global/global.consts"
import { formatPokemonName } from "@/global/global.helper"
import { useModalStore } from "@/stores/modal"
import { usePokemonStore } from "@/stores/pokemon"

import EditItemModal from "./modals/EditItemModal.vue"

export default {
  name: "PlayerPokemonDetails",
  components: {
    KeyValueText,
    PokemonRender,
    TypeLabel,
    MoveLabel,
    StatsSection,
    ActionButton,
    ActiveTeam,
    EditItemModal,
    PlusIcon,
  },
  setup() {
    return {
      pokemonStore: usePokemonStore(),
      pokemonActionButtons,
      formatPokemonName,
    }
  },
  computed: {
    activeTeam(): PersonalizedPokemon[] {
      return this.pokemonStore.playerTeam
    },
    activePokemon(): PersonalizedPokemon | null {
      return this.pokemonStore.activePokemonPlayer
    },
    activePokemonPrimaryType(): PokemonType {
      return this.activePokemon?.pokemon.types[0].type.name as PokemonType
    },
    activePokemonSecondaryType(): PokemonType | null {
      if (!this.activePokemon?.pokemon.types[1]) return null
      return this.activePokemon?.pokemon.types[1]?.type.name as PokemonType
    },
  },
  mounted() {
    this.activePokemon = this.pokemonStore.activePokemonPlayer
  },
  methods: {
    openEditItemModal() {
      const modal = useModalStore()
      modal.open(EditItemModal, "Select held item", { side: "player" })
    },
  },
}
</script>
