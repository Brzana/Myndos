<template>
  <div>
    <h2 class="text-lg font-bold mb-2">Prompt Templates</h2>
    <ul>
      <li v-for="prompt in prompts" :key="prompt.id" class="mb-2">
        <button class="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded">{{ prompt.title }}</button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const prompts = [] as any
</script>
<style scoped></style>
