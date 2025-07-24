<template>
  <DashboardLayout>
    <div class="max-w-xl mx-auto mt-10">
      <h1 class="text-2xl font-bold mb-6 text-center">Exam Mode</h1>
      <StudentExamGenerator />
    </div>
  </DashboardLayout>
</template>
<script setup lang="ts">
import DashboardLayout from '../layouts/DashboardLayout.vue'
import StudentExamGenerator from '../components/StudentExamGenerator.vue'
</script>
