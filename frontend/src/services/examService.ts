import axios from 'axios'

const API_URL = '/api/exam'

export async function generateExam(folders: string[], numQuestions: number) {
  const res = await axios.post(`${API_URL}/generate`, { folders, numQuestions })
  return res.data
}
