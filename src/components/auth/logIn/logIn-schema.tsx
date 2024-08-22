import { z } from 'zod'

export const logInSchema = z.object({
  email: z.string({ message: 'Поля не должны быть пустыми' }).email(),
  password: z
    .string({ message: 'Поля не должны быть пустыми' })
    .min(3, { message: 'Minimum number of characters 6; Maximum number of characters 20' }),
})
