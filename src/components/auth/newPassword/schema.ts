import { z } from 'zod'

//todo apply the same regexp as for sign-up
//todo translate validation errors somehow
export const newPasswordSchema = z
  .object({
    confirmPassword: z.string().min(6, 'Passwords do not match'),
    newPassword: z
      .string()
      .min(6, 'Password has to be at least 6 characters long')
      .regex(/[0-9]/, 'Password must contain at least one digit')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(
        /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/,
        'Password must contain at least one special character'
      ),
    recoveryCode: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type NewPasswordFormData = z.infer<typeof newPasswordSchema>
