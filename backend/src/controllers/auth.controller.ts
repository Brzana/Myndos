import { Request, Response } from 'express'
export const login = (req: Request, res: Response) => {
  // Stub: Authenticate user, return JWT
  res.json({ token: 'mock-jwt', role: 'student' })
}
export const register = (req: Request, res: Response) => {
  // Stub: Register user
  res.status(201).json({ message: 'Registered' })
}
