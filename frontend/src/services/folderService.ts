import axios from 'axios'

const API_URL = '/api/folders'

export async function getFolders() {
  const res = await axios.get(API_URL)
  return res.data
}

export async function createFolder(name: string) {
  const res = await axios.post(API_URL, { name })
  return res.data
}

export async function addQuestionToFolder(folderName: string, question: string) {
  const res = await axios.post(`${API_URL}/${encodeURIComponent(folderName)}/questions`, {
    question,
  })
  return res.data
}

export async function deleteFolder(name: string) {
  const res = await axios.delete(`${API_URL}/${encodeURIComponent(name)}`)
  return res.data
}
