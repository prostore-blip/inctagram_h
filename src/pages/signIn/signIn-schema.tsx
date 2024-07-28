import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string({ message: 'Поля не должны быть пустыми' }).email({
    message:
      'Password must contain 0-9, a-z, A-Z, ! " # $ % &\n' +
      "' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~",
  }),
  password: z
    .string({ message: 'Поля не должны быть пустыми' })
    .min(3, { message: 'Minimum number of characters 6; Maximum number of characters 20' }),
})
