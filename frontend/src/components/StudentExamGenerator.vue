<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Generate Exam</h2>
    <form @submit.prevent="onGenerate">
      <div class="mb-4">
        <label class="block mb-1">Select Folders:</label>
        <div class="flex flex-wrap gap-2">
          <label v-for="folder in folders" :key="folder.name" class="flex items-center gap-1">
            <input type="checkbox" v-model="selectedFolders" :value="folder.name" />
            {{ folder.name }}
          </label>
        </div>
      </div>
      <div class="mb-4">
        <label class="block mb-1">Number of Questions:</label>
        <input
          type="number"
          v-model.number="numQuestions"
          min="1"
          class="border rounded px-2 py-1 w-24"
        />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded" :disabled="loading">
        {{ loading ? 'Generating...' : 'Generate Exam' }}
      </button>
      <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
    </form>
    <div v-if="exam && exam.length" class="mt-8">
      <h3 class="text-lg font-bold mb-2">Exam</h3>
      <div v-for="(q, idx) in exam" :key="idx" class="mb-6 p-4 border rounded">
        <div class="font-semibold mb-2">{{ idx + 1 }}. {{ q.question }}</div>
        <div class="flex flex-col gap-2">
          <label v-for="(option, oIdx) in q.options" :key="oIdx" class="flex items-center gap-2">
            <input type="radio" :name="'q' + idx" :value="oIdx" v-model="userAnswers[idx]" />
            {{ option }}
          </label>
        </div>
      </div>
      <button
        v-if="!showResults"
        @click="submitExam"
        class="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit Exam
      </button>
      <div v-if="showResults" class="mt-4">
        <div class="text-lg font-bold">Results</div>
        <div>You scored {{ score }} / {{ exam.length }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getFolders } from '../services/folderService'
import { generateExam } from '../services/examService'

const folders = ref<{ name: string }[]>([])
const selectedFolders = ref<string[]>([])
const numQuestions = ref(5)
const loading = ref(false)
const error = ref('')
const exam = ref<any[]>([])
const userAnswers = ref<number[]>([])
const showResults = ref(false)
const score = ref(0)

onMounted(async () => {
  const data = await getFolders()
  folders.value = data.folders || data
})

async function onGenerate() {
  error.value = ''
  showResults.value = false
  score.value = 0
  if (!selectedFolders.value.length) {
    error.value = 'Select at least one folder.'
    return
  }
  if (numQuestions.value < 1) {
    error.value = 'Number of questions must be at least 1.'
    return
  }
  loading.value = true
  try {
    const res = await generateExam(selectedFolders.value, numQuestions.value)
    exam.value = res.exam
    userAnswers.value = Array(res.exam.length).fill(null)
  } catch (e: any) {
    error.value = e?.response?.data?.error || 'Failed to generate exam.'
  } finally {
    loading.value = false
  }
}

function submitExam() {
  let correct = 0
  exam.value.forEach((q, idx) => {
    if (userAnswers.value[idx] === q.correct) correct++
  })
  score.value = correct
  showResults.value = true
}
</script>
