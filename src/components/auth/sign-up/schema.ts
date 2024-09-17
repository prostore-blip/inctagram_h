import { z } from 'zod'

export const signUpSchema = z
  .object({
    acceptPolicies: z.boolean(),
    captchaToken: z.string().min(5, 'recaptcha token is mandatory'),
    confirmPassword: z.string().min(3, 'Password has to be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(3, 'Password has to be at least 3 characters long'),
    userName: z.string().min(3, 'Username has to be at least 3 characters long'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine(data => data.acceptPolicies, {
    message: 'You must accept',
    path: ['acceptPolicies'],
  })

export type SignUpFormData = z.infer<typeof signUpSchema>
