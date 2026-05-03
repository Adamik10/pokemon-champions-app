<template>
  <RoundedLabel>
    <TypeIcon smaller-icon type="fighting" />
    <div class="h-[1em] overflow-hidden pl-1 text-base text-ellipsis whitespace-nowrap capitalize">
      Collision Course
    </div>
  </RoundedLabel>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import RoundedLabel from "@/components/UI/RoundedLabel.vue"
import TypeIcon from "@/components/UI/TypeIcon.vue"

export default defineComponent({
  name: "MoveLabel",
  components: {
    RoundedLabel,
    TypeIcon,
  },
  props: {
    exampleProp: String,
  },
  data() {
    return {}
  },
  methods: {},
})
</script>
