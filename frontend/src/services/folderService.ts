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
