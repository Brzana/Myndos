<template>
  <div class="landing-container">
    <button class="landing-btn student-btn" @click="goToStudent">student</button>
    <button class="landing-btn teacher-btn" @click="goToTeacher">teacher</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const goToStudent = () => router.push({ name: 'student-options' })
const goToTeacher = () => router.push({ name: 'teacher-tasks' })
</script>

<style scoped>
.landing-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  gap: 8rem;
  z-index: 1;
}
.landing-btn {
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
}
.landing-btn:hover {
  background: linear-gradient(90deg, #16a34a 0%, #059669 50%, #166534 100%);
  border-color: #16a34a;
  box-shadow: 0 12px 40px 0 rgba(16, 185, 129, 0.25);
}
</style>
