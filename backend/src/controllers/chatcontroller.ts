import { Request, Response } from 'express'
export const proxyToOpenAI = (req: Request, res: Response) => {
  // Stub: Proxy request to OpenAI
  res.json({ response: 'AI response' })
}
