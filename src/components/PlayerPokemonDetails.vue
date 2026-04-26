<template>
  <div class="fixed top-0 flex w-full flex-col gap-2 bg-white px-1 pt-2">
    <!-- Team selection section -->
    <div class="flex w-full justify-center gap-5">
      <Pokeball />
      <Pokeball />
      <Pokeball />
      <Pokeball />
      <Pokeball />
      <Pokeball />
    </div>
    <!-- Pokemon details section -->
    <div class="flex w-full">
      <!-- Image ability item section -->
      <div class="flex w-1/3 flex-col gap-2">
        <div
          class="bg-base-lilac flex aspect-square w-full items-center justify-center rounded-full">
          Image
        </div>
        <KeyValueText category="Ability" value="mega sol" />
        <KeyValueText category="Ability" value="mega sol" />
        <div>Item</div>
      </div>
      <!-- Name typing moves section -->
      <div class="w-1/3">
        <div>Name</div>
        <div>Typing</div>
        <div>Moves</div>
      </div>
      <!-- Stats section -->
      <div class="w-1/3">
        <div>Stats</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Pokeball from "@/assets/Pokeball.vue"
import KeyValueText from "@/components/UI/KeyValueText.vue"

export default {
  name: "PlayerPokemonDetails",
  components: {
    Pokeball,
    KeyValueText,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
