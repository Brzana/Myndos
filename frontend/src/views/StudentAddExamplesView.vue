<template>
  <DashboardLayout>
    <button class="back-home-btn" @click="goToStudentHome">← Student</button>
    <div class="student-edit-questions-center-wrapper">
      <div class="max-w-xl w-full center-content-box">
        <h1 class="text-2xl font-bold mb-6 text-center">Edit Example Questions</h1>
        <div class="flex justify-between items-center mb-4">
          <span class="text-lg font-semibold">Folders</span>
          <button
            @click="createFolder"
            class="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl"
            title="Add Folder"
          >
            +
          </button>
        </div>
        <ul class="mb-6">
          <li
            v-for="(folder, idx) in folders"
            :key="idx"
            class="mb-2 p-2 border rounded bg-gray-50 group relative"
          >
            <div class="flex justify-between items-center">
              <span class="font-medium">{{ folder.name }}</span>
              <span class="ml-2 text-xs text-gray-500"
                >({{ folder.questions.length }} questions)</span
              >
              <button
                @click="confirmDeleteFolder(folder.name)"
                style="background-color: #e53e3e; color: white; border: none"
                class="ml-2 w-8 h-8 rounded-md flex items-center justify-center text-lg font-bold"
                title="Delete folder"
                type="button"
              >
                ×
              </button>
            </div>
            <ul v-if="folder.questions.length" class="ml-4 mt-2 list-disc text-sm text-gray-700">
              <li
                v-for="(q, qIdx) in folder.questions"
                :key="qIdx"
                class="flex items-center justify-between group"
              >
                <span>{{ q }}</span>
                <button
                  @click="deleteQuestion(folder.name, q)"
                  style="background-color: #e53e3e; color: white; border: none"
                  class="ml-2 w-6 h-6 rounded-md flex items-center justify-center text-base font-bold opacity-80 hover:opacity-100 transition-opacity"
                  title="Delete question"
                  type="button"
                >
                  ×
                </button>
              </li>
            </ul>
          </li>
          <li v-if="folders.length === 0" class="text-gray-400">No folders yet.</li>
        </ul>

        <form @submit.prevent="submitQuestion" class="mb-4 p-4 border rounded bg-white shadow">
          <div class="mb-2">
            <label class="block mb-1 font-medium">Select Folder</label>
            <select v-model="selectedFolder" class="w-full border rounded px-2 py-1">
              <option disabled value="">-- Select a folder --</option>
              <option v-for="folder in folders" :key="folder.name" :value="folder.name">
                {{ folder.name }}
              </option>
            </select>
          </div>
          <div class="mb-2">
            <label class="block mb-1 font-medium">New Question</label>
            <input
              v-model="newQuestion"
              type="text"
              class="w-full border rounded px-2 py-1"
              placeholder="Enter your question"
            />
          </div>
          <button
            type="submit"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
            :disabled="!selectedFolder || !newQuestion || loading"
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  </DashboardLayout>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'
const router = useRouter()
const goToStudentHome = () => router.push({ name: 'student-options' })
import {
  getFolders,
  createFolder as apiCreateFolder,
  addQuestionToFolder as apiAddQuestionToFolder,
  deleteFolder as apiDeleteFolder,
  deleteQuestion as apiDeleteQuestion,
} from '../services/folderService'
async function deleteQuestion(folderName: string, question: string) {
  if (!window.confirm('Are you sure you want to delete this question?')) return
  loading.value = true
  try {
    await apiDeleteQuestion(folderName, question)
    // Update UI: remove question from the folder in folders.value
    const folder = folders.value.find((f) => f.name === folderName)
    if (folder) {
      folder.questions = folder.questions.filter((q) => q !== question)
    }
  } catch (e: any) {
    alert(e?.response?.data?.error || 'Error deleting question')
  } finally {
    loading.value = false
  }
}
async function confirmDeleteFolder(name: string) {
  if (!window.confirm('Are you sure you want to delete this folder?')) return
  loading.value = true
  try {
    await apiDeleteFolder(name)
    folders.value = folders.value.filter((f) => f.name !== name)
    if (selectedFolder.value === name) selectedFolder.value = ''
  } catch (e: any) {
    alert(e?.response?.data?.error || 'Error deleting folder')
  } finally {
    loading.value = false
  }
}

const folders = ref<{ name: string; questions: string[] }[]>([])
const loading = ref(false)
const error = ref('')
const selectedFolder = ref('')
const newQuestion = ref('')

async function loadFolders() {
  loading.value = true
  error.value = ''
  try {
    folders.value = await getFolders()
  } catch (e) {
    error.value = 'Failed to load folders'
  } finally {
    loading.value = false
  }
}

async function createFolder() {
  const name = prompt('Enter folder name:')?.trim()
  if (name) {
    try {
      const newFolder = await apiCreateFolder(name)
      folders.value.push(newFolder)
    } catch (e: any) {
      alert(e?.response?.data?.error || 'Failed to create folder')
    }
  }
}

async function submitQuestion() {
  if (!selectedFolder.value || !newQuestion.value) return
  loading.value = true
  try {
    const updatedFolder = await apiAddQuestionToFolder(selectedFolder.value, newQuestion.value)
    // Update the folder in the folders list
    const idx = folders.value.findIndex((f) => f.name === updatedFolder.name)
    if (idx !== -1) {
      folders.value[idx] = updatedFolder
    }
    newQuestion.value = ''
  } catch (e: any) {
    alert(e?.response?.data?.error || 'Failed to add question')
  } finally {
    loading.value = false
  }
}

onMounted(loadFolders)
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
  z-index: 20;
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
.student-edit-questions-center-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  z-index: 10;
}
.center-content-box {
  margin: 0 !important;
}
</style>
