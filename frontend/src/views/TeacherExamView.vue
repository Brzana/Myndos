<template>
  <DashboardLayout>
    <button class="back-home-btn" @click="goToTeacher">← Teacher</button>
    <div class="teacher-exam-container">
      <h1 class="text-2xl font-bold mb-6 text-center">Generate Exam</h1>
      <!-- Exam generation UI goes here -->
      <p class="text-center">This is where the teacher can generate an exam.</p>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'
const router = useRouter()
const goToTeacher = () => router.push({ name: 'teacher-options' })
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
.back-home-btn {
  position: absolute;
  top: 2rem;
  left: 2rem;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%);
  border: 2px solid #60a5fa;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px 0 rgba(34, 197, 94, 0.08);
  cursor: pointer;
  z-index: 10;
  transition:
    background 0.2s,
    color 0.2s,
    border 0.2s;
}
.back-home-btn:hover {
  background: linear-gradient(90deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%);
  border-color: #1d4ed8;
  color: #fff;
}
</style>
