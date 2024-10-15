import { LocaleType } from '@/locales/ru'
import { z } from 'zod'

//todo translation for validation messages
// export const logInSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(1, { message: 'Поля не должны быть пустыми' }),
// })

export const logInSchema = (t: LocaleType) =>
  z.object({
    email: z.string().email({ message: t.common.incorrectEmail }),
    password: z.string().min(1, { message: t.common.requiredField }),
  })

export type SignInFormData = z.infer<ReturnType<typeof logInSchema>>
