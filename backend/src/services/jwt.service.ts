import jwt from 'jsonwebtoken'
export const signToken = (payload: any) => {
  // Stub: Sign JWT
  return 'mock-jwt'
}
export const verifyToken = (token: string) => {
  // Stub: Verify JWT
  return { id: 1, role: 'student' }
}
