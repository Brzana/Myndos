import { Request, Response, NextFunction } from 'express'
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Stub: JWT check
  next()
}
