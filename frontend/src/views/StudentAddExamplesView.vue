<template>
  <DashboardLayout>
    <div class="max-w-xl mx-auto mt-10">
      <h1 class="text-2xl font-bold mb-6 text-center">Add Example Questions</h1>
      <form @submit.prevent="submitExample" class="space-y-4">
        <textarea v-model="question" class="w-full p-3 border rounded" rows="4" placeholder="Enter your example question..."></textarea>
        <button type="submit" class="w-full py-2 px-4 rounded bg-green-600 text-white font-semibold hover:bg-green-700">Submit</button>
      </form>
      <div v-if="submitted" class="mt-4 text-green-600 text-center">Question submitted!</div>
    </div>
  </DashboardLayout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
const question = ref('')
const submitted = ref(false)
const submitExample = () => {
  // TODO: Send to backend
  submitted.value = true
  question.value = ''
  setTimeout(() => (submitted.value = false), 2000)
}
</script>
