import { LocaleType } from '@/locales/ru'
import { z } from 'zod'

export const logInSchema = (t: LocaleType) =>
  z.object({
    email: z.string().email({ message: t.common.incorrectEmail }),
    password: z
      .string()
      .min(6, { message: t.signUp.minCharsNumber(6) })
      .max(30, { message: t.signUp.maxCharsNumber(30) })
      .regex(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/,
        {
          message: t.signUp.passwordMustContain,
        }
      ),
  })

export type SignInFormData = z.infer<ReturnType<typeof logInSchema>>
