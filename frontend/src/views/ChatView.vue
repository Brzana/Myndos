<template>
  <DashboardLayout>
    <template #navbar>
      <!-- Navbar content -->
    </template>
    <ChatInterface />
    <PromptLibrary />
  </DashboardLayout>
</template>
<script setup lang="ts">
import DashboardLayout from '../layouts/DashboardLayout.vue'
import ChatInterface from '../components/ChatInterface.vue'
import PromptLibrary from '../components/PromptLibrary.vue'
</script>
<style scoped></style>
