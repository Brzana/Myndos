import { Request, Response } from 'express'
export const getAll = (req: Request, res: Response) => {
  // Stub: Return all prompt templates
  res.json([])
}
export const create = (req: Request, res: Response) => {
  // Stub: Create prompt template
  res.status(201).json({})
}
