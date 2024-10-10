import { JwtToken } from '@/services/incta-team-api/auth/instagram.auth.type'

export function decodeJWT(token: string): JwtToken {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

  return JSON.parse(atob(base64))
}
