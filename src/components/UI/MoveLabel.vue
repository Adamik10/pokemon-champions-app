<template>
  <RoundedLabel @click="handleClick()">
    <TypeIcon
      smaller-icon
      :type="(move?.type.name as PokemonType) || undefined"
      empty-state-color-class="bg-base-lilac/50" />
    <div
      class="h-[1em] w-full overflow-hidden pl-1 text-base text-ellipsis whitespace-nowrap
        capitalize">
      <template v-if="move">
        {{
          move?.names.find(name => name.language.name === "en")?.name || move.name.replace("-", " ")
        }}
      </template>
      <div
        v-else-if="!move && pokemon"
        class="flex h-full w-full items-center justify-end gap-1 text-white/80">
        Add Move
        <PlusIcon class="mr-2 h-2 w-2" />
      </div>
    </div>
  </RoundedLabel>
</template>

<script lang="ts">
import { type Move, type Pokemon } from "pokenode-ts"
import { defineComponent } from "vue"

import PlusIcon from "@/assets/PlusIcon.vue"
import RoundedLabel from "@/components/UI/RoundedLabel.vue"
import TypeIcon, { type PokemonType } from "@/components/UI/TypeIcon.vue"
import EditMoveModal from "@/components/modals/EditMoveModal.vue"
import { useModalStore } from "@/stores/modal"

export default defineComponent({
  name: "MoveLabel",
  components: {
    RoundedLabel,
    TypeIcon,
    PlusIcon,
  },
  props: {
    move: Object as () => Move | null,
    moveSlot: Number,
    team: {
      type: String as () => "player" | "opponent",
      required: true,
    },
    pokemon: Object as () => Pokemon | null,
  },
  setup() {
    return {
      modalStore: useModalStore(),
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      if (!this.pokemon) return
      if (!this.move) {
        this.modalStore.open(EditMoveModal, "Select move", {
          side: this.team,
          moveSlot: this.moveSlot,
        })
      } else {
        console.log("clicking a move")
      }
    },
  },
})
</script>
