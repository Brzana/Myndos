import axios from 'axios'

const API_URL = '/api/teacher-folders'

export async function getTeacherFolders() {
  const res = await axios.get(API_URL)
  return res.data
}

export async function createTeacherFolder(name: string) {
  const res = await axios.post(API_URL, { name })
  return res.data
}

export async function addQuestionToTeacherFolder(folderName: string, question: string) {
  const res = await axios.post(`${API_URL}/${encodeURIComponent(folderName)}/questions`, {
    question,
  })
  return res.data
}

export async function deleteTeacherFolder(name: string) {
  const res = await axios.delete(`${API_URL}/${encodeURIComponent(name)}`)
  return res.data
}

export async function deleteTeacherQuestion(folderName: string, question: string) {
  const res = await axios.delete(`${API_URL}/${encodeURIComponent(folderName)}/questions`, {
    data: { question },
  })
  return res.data
}
