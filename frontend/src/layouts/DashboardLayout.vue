// Dashboard layout using Tailwind CSS
<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <nav class="bg-white dark:bg-gray-800 shadow p-4 flex justify-between">
      <slot name="navbar" />
    </nav>
    <main class="p-6 min-h-screen flex flex-col">
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
// ...
</script>
<style scoped></style>
