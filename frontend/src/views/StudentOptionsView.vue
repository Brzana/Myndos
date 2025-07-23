<template>
  <DashboardLayout>
    <button class="back-home-btn" @click="goToHome">← Home</button>
    <div class="student-options-container">
      <h1 class="text-2xl font-bold mb-6 text-center">Student Options</h1>
      <ul class="student-options-list">
        <li>
          <button @click="goToExam" class="student-option-btn">Exam Mode</button>
        </li>
        <li>
          <button @click="goToChat" class="student-option-btn">Chat Mode</button>
        </li>
        <li>
          <button @click="goToAddExamples" class="student-option-btn">Edit Questions</button>
        </li>
      </ul>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'
const router = useRouter()
const goToExam = () => router.push({ name: 'student-exam' })
const goToChat = () => router.push({ name: 'student-chat' })
const goToAddExamples = () => router.push({ name: 'student-add-examples' })
const goToHome = () => router.push({ name: 'landing' })
</script>

<style scoped>
.student-options-container {
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
  background: linear-gradient(90deg, #22c55e 0%, #10b981 50%, #16a34a 100%);
  border: 2px solid #4ade80;
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
  background: linear-gradient(90deg, #16a34a 0%, #059669 50%, #166534 100%);
  border-color: #16a34a;
  color: #fff;
}
.student-options-list {
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
.student-option-btn {
  padding: 1.25rem 3rem;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(90deg, #22c55e 0%, #10b981 50%, #16a34a 100%);
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px 0 rgba(34, 197, 94, 0.2);
  border: 4px solid #4ade80;
  transition:
    background 0.3s,
    border 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  display: block;
}
.student-option-btn:hover {
  background: linear-gradient(90deg, #16a34a 0%, #059669 50%, #166534 100%);
  border-color: #16a34a;
  box-shadow: 0 12px 40px 0 rgba(16, 185, 129, 0.25);
}
</style>
