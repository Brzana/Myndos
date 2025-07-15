import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

const FOLDER_PATH = path.join(__dirname, '../../data/folders.json')

function readFolders() {
  if (!fs.existsSync(FOLDER_PATH)) return []
  const data = fs.readFileSync(FOLDER_PATH, 'utf-8')
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeFolders(folders: any[]) {
  fs.mkdirSync(path.dirname(FOLDER_PATH), { recursive: true })
  fs.writeFileSync(FOLDER_PATH, JSON.stringify(folders, null, 2), 'utf-8')
}

export const getAllFolders = (_req: Request, res: Response) => {
  const folders = readFolders()
  res.json(folders)
}

export const createFolder = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'Name is required' })
  const folders = readFolders()
  if (folders.some((f: any) => f.name === name)) {
    return res.status(409).json({ error: 'Folder already exists' })
  }
  const newFolder = { name, questions: [] }
  folders.push(newFolder)
  writeFolders(folders)
  res.status(201).json(newFolder)
}
