import { LocaleType } from '@/locales/ru'
import { z } from 'zod'

export const signUpSchema = (t: LocaleType) =>
  z
    .object({
      acceptTerms: z.literal<boolean>(true),
      confirmPassword: z.string(),
      email: z.string().email({ message: t.signUp.emailType }),
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
      userName: z
        .string()
        .min(6, { message: t.signUp.minCharsNumber(6) })
        .max(30, { message: t.signUp.maxCharsNumber(30) })
        .regex(/^[a-zA-Z0-9_-]*$/, {
          message: t.signUp.userNameContains,
        }),
    })
    .refine(values => values.password === values.confirmPassword, {
      message: t.signUp.passwordMatch,
      path: ['confirmPassword'],
    })

export type SignupFormFields = z.infer<ReturnType<typeof signUpSchema>>
