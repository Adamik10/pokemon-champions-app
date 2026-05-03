<template>
  <div class="flex h-full w-full justify-center">
    <RoundedTable>
      <div
        v-for="(stat, index) in statKeys"
        :key="stats[stat].name"
        class="relative flex w-full flex-1 items-center justify-center gap-1.5 px-1 py-0.5
          text-center"
        :class="(index + 1) % 2 === 0 ? 'bg-base-purple/33' : ''">
        <component :is="stats[stat].component" class="h-auto w-4" />
        <div class="text-label font-200 text-white">80</div>
        <div class="bg-base-purple text-label px-2 text-white">120</div>
        <div
          v-if="index !== 0"
          class="text-bold-number border-base-lilac text-base-lilac absolute -left-4.5 flex
            min-h-4/5 items-center justify-center rounded-tl-lg rounded-bl-xs border border-r-0
            pt-px pr-1 pl-0.5 opacity-60">
          -1
        </div>
        <div
          v-if="index !== 0"
          class="text-bold-number border-base-lilac text-base-lilac absolute top-0.5 -right-5 flex
            min-h-4/5 items-center justify-center rounded-tr-xs rounded-br-lg border border-l-0
            pr-0.5 pb-px pl-1 opacity-60">
          +1
        </div>
      </div>
      <DiamondText class="mx-1 mt-1" color="grey">Modest</DiamondText>
    </RoundedTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import DiamondText from "@/components/UI/DiamondText.vue"
import RoundedTable from "@/components/UI/RoundedTable.vue"
import { stats } from "@/consts/global.consts"

export default defineComponent({
  name: "StatsSection",
  components: {
    RoundedTable,
    DiamondText,
  },
  props: {
    exampleProp: String,
  },
  setup() {
    return {
      stats,
    }
  },
  data() {
    return {}
  },
  computed: {
    statKeys: () => Object.keys(stats) as (keyof typeof stats)[],
  },
  methods: {},
})
</script>
