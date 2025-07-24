import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

const TEACHER_FOLDER_PATH = path.join(
  __dirname,
  '../../data/teacher_folders.json'
)

function readTeacherFolders() {
  if (!fs.existsSync(TEACHER_FOLDER_PATH)) return []
  const data = fs.readFileSync(TEACHER_FOLDER_PATH, 'utf-8')
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeTeacherFolders(folders: any[]) {
  fs.mkdirSync(path.dirname(TEACHER_FOLDER_PATH), { recursive: true })
  fs.writeFileSync(
    TEACHER_FOLDER_PATH,
    JSON.stringify(folders, null, 2),
    'utf-8'
  )
}

export const getAllTeacherFolders = (_req: Request, res: Response) => {
  const folders = readTeacherFolders()
  res.json(folders)
}

export const createTeacherFolder = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'Name is required' })
  const folders = readTeacherFolders()
  if (folders.some((f: any) => f.name === name)) {
    return res.status(409).json({ error: 'Folder already exists' })
  }
  const newFolder = { name, questions: [] }
  folders.push(newFolder)
  writeTeacherFolders(folders)
  res.status(201).json(newFolder)
}

export const addQuestionToTeacherFolder = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { name } = req.params
  const { question } = req.body
  if (!question) {
    return res.status(400).json({ error: 'Question is required' })
  }
  const folders = readTeacherFolders()
  const folder = folders.find((f: any) => f.name === name)
  if (!folder) {
    return res.status(404).json({ error: 'Folder not found' })
  }
  folder.questions.push(question)
  writeTeacherFolders(folders)
  res.json(folder)
}

export const deleteTeacherFolder = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { name } = req.params
  let folders = readTeacherFolders()
  const folderIndex = folders.findIndex((f: any) => f.name === name)
  if (folderIndex === -1) {
    return res.status(404).json({ error: 'Folder not found' })
  }
  folders.splice(folderIndex, 1)
  writeTeacherFolders(folders)
  res.status(204).send()
}

export const deleteTeacherQuestion = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { name } = req.params
  const { question } = req.body
  if (!question) {
    return res.status(400).json({ error: 'Question is required' })
  }
  const folders = readTeacherFolders()
  const folder = folders.find((f: any) => f.name === name)
  if (!folder) {
    return res.status(404).json({ error: 'Folder not found' })
  }
  const index = folder.questions.indexOf(question)
  if (index === -1) {
    return res.status(404).json({ error: 'Question not found in folder' })
  }
  folder.questions.splice(index, 1)
  writeTeacherFolders(folders)
  res.status(204).send()
}
