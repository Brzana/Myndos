import { Request, Response } from 'express'
export const getAll = (req: Request, res: Response) => {
  // Stub: Return all tasks
  res.json([])
}
export const create = (req: Request, res: Response) => {
  // Stub: Create task
  res.status(201).json({})
}
export const getById = (req: Request, res: Response) => {
  // Stub: Get task by ID
  res.json({})
}
export const submitResponse = (req: Request, res: Response) => {
  // Stub: Submit student response
  res.status(201).json({})
}
