import { z } from 'zod'

//todo apply the same regexp as for sign-up
//todo translate validation errors somehow
export const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password has to be at least 6 characters long')
      .regex(/[0-9]/, 'Password must contain at least one digit')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(
        /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/,
        'Password must contain at least one special character'
      ),
    recaptcha: z.string(),
    repeatPassword: z.string().min(6, 'Passwords do not match'),
    token: z.string(),
  })
  .refine(data => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  })

export type ResetPasswordRequestData = z.infer<typeof resetPasswordFormSchema>
