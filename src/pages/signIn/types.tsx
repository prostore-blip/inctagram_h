import { signInSchema } from '@/pages/signIn/signIn-schema'
import { z } from 'zod'

export type FormValues = z.infer<typeof signInSchema>
