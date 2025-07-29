<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Generate Exam (Teacher)</h2>
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
      <div class="mb-4">
        <label class="block mb-1">Exam Type:</label>
        <select v-model="examType" class="border rounded px-2 py-1">
          <option value="theoretical">Theoretical</option>
          <option value="practical">Practical</option>
        </select>
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded" :disabled="loading">
        {{ loading ? 'Generating...' : 'Generate Exam' }}
      </button>
      <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
    </form>
    <div v-if="exam && exam.length" class="mt-8">
      <h3 class="text-lg font-bold mb-2">Exam</h3>
      <div class="overflow-y-auto max-h-[60vh] pr-2">
        <div
          v-for="(q, idx) in exam"
          :key="idx"
          class="mb-6 p-4 border rounded bg-white dark:bg-gray-800"
        >
          <div class="font-semibold mb-2">{{ idx + 1 }}. {{ q.question }}</div>
          <div class="flex flex-col gap-2">
            <div v-for="(option, oIdx) in q.options" :key="oIdx" class="flex items-center gap-2">
              <span>{{ String.fromCharCode(65 + oIdx) }}. {{ option }}</span>
            </div>
          </div>
          <div class="mt-2 text-green-700 font-semibold">
            Correct: {{ String.fromCharCode(65 + q.correct) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTeacherFolders } from '../services/teacherFolderService'
import { generateTeacherExam } from '../services/examService'

const folders = ref<{ name: string }[]>([])
const selectedFolders = ref<string[]>([])
const numQuestions = ref(5)
const examType = ref<'theoretical' | 'practical'>('theoretical')
const loading = ref(false)
const error = ref('')
const exam = ref<any[]>([])

onMounted(async () => {
  const data = await getTeacherFolders()
  folders.value = data.folders || data
})

async function onGenerate() {
  error.value = ''
  exam.value = []
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
    const res = await generateTeacherExam(selectedFolders.value, numQuestions.value, examType.value)
    exam.value = res.exam
  } catch (e: any) {
    error.value = e?.response?.data?.error || 'Failed to generate exam.'
  } finally {
    loading.value = false
  }
}
</script>
