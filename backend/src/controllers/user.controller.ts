import { Request, Response } from 'express'
export const getProfile = (req: Request, res: Response) => {
  // Stub: Return user profile
  res.json({ id: 1, name: 'Test User', role: 'student' })
}
