<template>
  <DashboardLayout>
    <button class="back-home-btn" @click="goToHome">← Home</button>
    <div class="teacher-options-container">
      <h1 class="text-2xl font-bold mb-6 text-center">Teacher Options</h1>
      <ul class="teacher-options-list">
        <li>
          <button @click="goToExam" class="teacher-option-btn">Generate Exam</button>
        </li>
        <li>
          <button @click="goToEditQuestions" class="teacher-option-btn">Edit Questions</button>
        </li>
      </ul>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'
const router = useRouter()
const goToExam = () => router.push({ name: 'teacher-exam' })
const goToEditQuestions = () => router.push({ name: 'teacher-edit-questions' })
const goToHome = () => router.push({ name: 'landing' })
</script>

<style scoped>
.teacher-options-container {
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
.teacher-options-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  max-width: 400px;
  padding: 0;
  list-style: none;
}
.teacher-option-btn {
  padding: 1.25rem 3rem;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%);
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px 0 rgba(59, 130, 246, 0.2);
  border: 4px solid #60a5fa;
  transition:
    background 0.3s,
    border 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
}
.teacher-option-btn:hover {
  background: linear-gradient(90deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%);
  border-color: #1d4ed8;
  box-shadow: 0 12px 40px 0 rgba(37, 99, 235, 0.25);
}
</style>
