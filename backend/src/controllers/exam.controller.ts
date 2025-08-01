import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'
import { config } from '../config'

const openai = new OpenAI({ apiKey: config.openaiApiKey })

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

function sampleQuestions(selectedFolders: string[], numQuestions: number) {
  const folders = readFolders()
  let allQuestions: string[] = []
  for (const folderName of selectedFolders) {
    const folder = folders.find((f: any) => f.name === folderName)
    if (folder && Array.isArray(folder.questions)) {
      allQuestions = allQuestions.concat(folder.questions)
    }
  }
  allQuestions = allQuestions.sort(() => Math.random() - 0.5)
  return allQuestions.slice(0, numQuestions)
}

export const generateExam = (async (req: Request, res: Response) => {
  const { folders, numQuestions } = req.body
  if (!Array.isArray(folders) || typeof numQuestions !== 'number') {
    return res
      .status(400)
      .json({ error: 'folders (array) and numQuestions (number) are required' })
  }
  const questions = sampleQuestions(folders, numQuestions)
  if (questions.length === 0) {
    return res
      .status(400)
      .json({ error: 'No questions found for selected folders' })
  }

  const prompt = `Generate a multiple-choice exam in JSON format.
For each question, provide an object with:
- question: the question text
- options: array of 4 answer options (strings)
- correct: index (0-3) of the correct option
Use the following questions as the base for the exam (paraphrase and make them multiple-choice):
${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
Generate exactly ${numQuestions} questions in total.
Return ONLY a JSON array, e.g.:
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correct": 2
  },
  ...
]`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for generating exams.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1200,
    })
    let text = completion.choices[0].message?.content || ''
    text = text.replace(/^```json[\r\n]+|```$/g, '').trim()
    let exam
    try {
      exam = JSON.parse(text)
    } catch {
      const match = text.match(/\[.*\]/s)
      if (match) {
        exam = JSON.parse(match[0])
      } else {
        throw new Error('Could not parse exam JSON')
      }
    }
    res.json({ exam })
  } catch (e: any) {
    res.status(500).json({ error: e.message || 'Failed to generate exam' })
  }
}) as any

export const generateTeacherExam = (async (req: Request, res: Response) => {
  const { folders, numQuestions, examType } = req.body
  if (
    !Array.isArray(folders) ||
    typeof numQuestions !== 'number' ||
    !['theoretical', 'practical'].includes(examType)
  ) {
    return res
      .status(400)
      .json({
        error:
          'folders (array), numQuestions (number), and examType (theoretical|practical) are required',
      })
  }
  const questions = sampleQuestions(folders, numQuestions)
  if (questions.length === 0) {
    return res
      .status(400)
      .json({ error: 'No questions found for selected folders' })
  }

  let typeInstruction = ''
  if (examType === 'practical') {
    typeInstruction =
      'Make each question a practical math problem that requires the student to calculate something. Do not ask for definitions or theory.'
  } else {
    typeInstruction =
      'Make each question a theoretical math question, focusing on definitions, concepts, or properties. Do not require calculations.'
  }

  const prompt = `Generate a multiple-choice exam in JSON format.\nFor each question, provide an object with:\n- question: the question text\n- options: array of 4 answer options (strings)\n- correct: index (0-3) of the correct option\n${typeInstruction}\nUse the following questions as the base for the exam (paraphrase and make them multiple-choice):\n${questions
    .map((q, i) => `${i + 1}. ${q}`)
    .join(
      '\\n'
    )}\nGenerate exactly ${numQuestions} questions in total.\nReturn ONLY a JSON array, e.g.:\n[\n  {\n    "question": "...",\n    "options": ["A", "B", "C", "D"],\n    "correct": 2\n  },\n  ...\n]`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for generating exams.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1200,
    })
    let text = completion.choices[0].message?.content || ''
    text = text.replace(/^```json[\r\n]+|```$/g, '').trim()
    let exam
    try {
      exam = JSON.parse(text)
    } catch {
      const match = text.match(/\[.*\]/s)
      if (match) {
        exam = JSON.parse(match[0])
      } else {
        throw new Error('Could not parse exam JSON')
      }
    }
    res.json({ exam })
  } catch (e: any) {
    res.status(500).json({ error: e.message || 'Failed to generate exam' })
  }
}) as any
