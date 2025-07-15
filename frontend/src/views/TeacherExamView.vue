<template>
  <DashboardLayout>
    <div class="teacher-exam-container">
      <h1 class="text-2xl font-bold mb-6 text-center">Generate Exam</h1>
      <!-- Exam generation UI goes here -->
      <p class="text-center">This is where the teacher can generate an exam.</p>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '../layouts/DashboardLayout.vue'
</script>

<style scoped>
.teacher-exam-container {
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
