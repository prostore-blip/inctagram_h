import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
})
