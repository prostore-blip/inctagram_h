import { z } from 'zod'

//todo translate validation messages
export const forgotPasswordFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  //for disabling submit button while recaptcha is not activated, the min value is arbitrary - the token is lengthy
  recaptcha: z.string().min(50, 'recaptcha token is mandatory'),
})

export type ForgotPasswordRequestData = z.infer<typeof forgotPasswordFormSchema>
