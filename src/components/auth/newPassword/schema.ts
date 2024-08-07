import { z } from 'zod'

//todo apply the same regexp as for sign-up
export const newPasswordSchema = z
  .object({
    confirmPassword: z.string().min(6, 'Password has to be at least 6 characters long'),
    newPassword: z.string().min(6, 'Password has to be at least 6 characters long'),
    recoveryCode: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type NewPasswordFormData = z.infer<typeof newPasswordSchema>
