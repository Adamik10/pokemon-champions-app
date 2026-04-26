<template>
  <div class="relative flex h-5 w-full">
    <DiamondText color="lilac" class="z-10 shrink-0"> {{ category }} </DiamondText>
    <DiamondText class="-ml-5 flex-1 pl-5"> {{ value }} </DiamondText>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import DiamondText from "./DiamondText.vue"

export default defineComponent({
  name: "KeyValueText",
  components: {
    DiamondText,
  },
  props: {
    category: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
