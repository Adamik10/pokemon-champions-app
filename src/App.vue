<template>
  <div class="flex h-screen items-center justify-center bg-gray-900">
    <h1 class="text-4xl font-bold text-green-400">Pokémon Speed App ⚡</h1>
    <p class="mt-4 text-white">Count: {{ count }}</p>
    <button class="mt-4 rounded bg-blue-500 px-4 py-2 text-white" @click="increment">
      Increment
    </button>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      count: 0,
    }
  },

  methods: {
    increment() {
      this.count++
    },
  },
}
</script>
