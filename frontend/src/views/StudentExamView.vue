<template>
  <DashboardLayout>
    <button class="back-home-btn" @click="goToStudentOptions">← Back</button>
    <div class="max-w-xl mx-auto mt-10">
      <h1 class="text-2xl font-bold mb-6 text-center">Exam Mode</h1>
      <StudentExamGenerator />
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import StudentExamGenerator from '../components/StudentExamGenerator.vue'
const router = useRouter()
const goToStudentOptions = () => router.push({ name: 'student-options' })
</script>

<style scoped>
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
</style>
