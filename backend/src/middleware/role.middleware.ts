import { Request, Response, NextFunction } from 'express'
export const requireRole =
  (role: string) => (req: Request, res: Response, next: NextFunction) => {
    // Stub: Role check
    next()
  }
