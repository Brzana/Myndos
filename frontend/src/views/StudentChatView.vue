<template>
  <DashboardLayout>
    <div class="max-w-xl mx-auto mt-10">
      <h1 class="text-2xl font-bold mb-6 text-center">Chat Mode</h1>
      <ChatInterface />
    </div>
  </DashboardLayout>
</template>
<script setup lang="ts">
import DashboardLayout from '../layouts/DashboardLayout.vue'
import ChatInterface from '../components/ChatInterface.vue'
</script>
