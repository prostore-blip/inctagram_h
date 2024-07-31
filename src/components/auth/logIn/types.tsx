import { logInSchema } from '@/components/auth/logIn/logIn-schema'
import { z } from 'zod'

export type FormValues = z.infer<typeof logInSchema>
