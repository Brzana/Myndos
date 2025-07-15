<template>
  <DashboardLayout>
    <div class="teacher-edit-questions-container">
      <h1 class="text-2xl font-bold mb-6 text-center">Edit Questions</h1>
      <!-- Question editing UI goes here -->
      <p class="text-center">This is where the teacher can edit or input questions.</p>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '../layouts/DashboardLayout.vue'
</script>

<style scoped>
.teacher-edit-questions-container {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 1;
  background: transparent;
}
</style>
