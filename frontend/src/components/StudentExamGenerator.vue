<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Generate Exam</h2>
    <form @submit.prevent="onGenerate" class="space-y-6">
      <div>
        <label class="block mb-2 text-gray-700 font-medium">Select Folders:</label>
        <div class="flex flex-wrap gap-3">
          <label
            v-for="folder in folders"
            :key="folder.name"
            class="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded cursor-pointer hover:bg-blue-100 transition"
          >
            <input
              type="checkbox"
              v-model="selectedFolders"
              :value="folder.name"
              class="accent-blue-600"
            />
            <span class="text-gray-700">{{ folder.name }}</span>
          </label>
        </div>
      </div>
      <div>
        <label class="block mb-2 text-gray-700 font-medium">Number of Questions:</label>
        <input
          type="number"
          v-model.number="numQuestions"
          min="1"
          class="border border-gray-300 rounded-lg px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg font-semibold shadow disabled:opacity-60 disabled:cursor-not-allowed"
        :disabled="loading"
      >
        {{ loading ? 'Generating...' : 'Generate Exam' }}
      </button>
      <div v-if="error" class="text-red-500 mt-2 text-center">{{ error }}</div>
    </form>
    <div v-if="exam && exam.length" class="mt-10">
      <h3 class="text-xl font-bold mb-4 text-gray-800">Exam</h3>
      <div
        v-for="(q, idx) in exam"
        :key="idx"
        class="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm"
      >
        <div class="font-semibold mb-3 text-gray-900">{{ idx + 1 }}. {{ q.question }}</div>
        <div class="flex flex-col gap-3">
          <label
            v-for="(option, oIdx) in q.options"
            :key="oIdx"
            class="flex items-center gap-3 px-2 py-1 rounded transition cursor-pointer"
            :style="showResults ? getOptionStyle(idx, oIdx) : ''"
          >
            <input
              type="radio"
              :name="'q' + idx"
              :value="oIdx"
              v-model="userAnswers[idx]"
              :disabled="showResults"
              class="accent-blue-600"
            />
            <span class="text-gray-700">{{ option }}</span>
            <span v-if="showResults && oIdx === q.correct" class="ml-1 text-green-600 font-bold"
              >✔</span
            >
            <span
              v-if="showResults && userAnswers[idx] === oIdx && userAnswers[idx] !== q.correct"
              class="ml-1 text-red-600 font-bold"
              >✘</span
            >
          </label>
        </div>
      </div>
      <button
        v-if="!showResults"
        @click="submitExam"
        class="w-full bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg font-semibold shadow"
      >
        Submit Exam
      </button>
      <div v-if="showResults" class="mt-6 text-center">
        <div class="text-xl font-bold text-gray-800">Results</div>
        <div class="text-lg text-gray-700">You scored {{ score }} / {{ exam.length }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Add getOptionStyle for correct/incorrect highlighting
function getOptionStyle(qIdx: number, oIdx: number) {
  if (!showResults.value) return ''
  // Add font-weight and text-shadow for readability
  if (exam.value[qIdx].correct === oIdx) {
    return 'background-color: #00fa56; border-radius: 0.25rem; font-weight: 600; text-shadow: 0 1px 2px #b6e7c9;' // green background
  }
  if (userAnswers.value[qIdx] === oIdx && userAnswers.value[qIdx] !== exam.value[qIdx].correct) {
    return 'background-color: #f00707; border-radius: 0.25rem; font-weight: 600; text-shadow: 0 1px 2px #fca5a5;' // red background
  }
  return ''
}
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
