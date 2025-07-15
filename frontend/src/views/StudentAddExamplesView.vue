<template>
  <DashboardLayout>
    <div class="max-w-xl mx-auto mt-10">
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
        <li v-for="(folder, idx) in folders" :key="idx" class="mb-2 p-2 border rounded bg-gray-50">
          <span class="font-medium">{{ folder.name }}</span>
          <span class="ml-2 text-xs text-gray-500">({{ folder.questions.length }} questions)</span>
        </li>
        <li v-if="folders.length === 0" class="text-gray-400">No folders yet.</li>
      </ul>
      <!-- Form and submit button removed as requested -->
    </div>
  </DashboardLayout>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import { getFolders, createFolder as apiCreateFolder } from '../services/folderService'

const folders = ref<{ name: string; questions: string[] }[]>([])
const loading = ref(false)
const error = ref('')

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

onMounted(loadFolders)
</script>
