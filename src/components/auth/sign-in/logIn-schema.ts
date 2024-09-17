import { z } from 'zod'

//todo translation for validation messages
export const logInSchema = z.object({
  captchaToken: z.string().min(5, 'recaptcha token is mandatory'),
  email: z.string().email(),
  password: z.string().min(1, { message: 'Поля не должны быть пустыми' }),
})

export type SignInFormData = z.infer<typeof logInSchema>
