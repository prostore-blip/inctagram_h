import { LocaleType } from '@/locales/ru'
import { z } from 'zod'

export const userGeneralInfoSchema = (t: LocaleType) =>
  z.object({
    // about: z.string().optional(),
    about: z.string(),
    // .regex(
    //   /^[0-9A-Za-zА-Яа-я\s!@#$%^&*()_+\-=[\]{};':"\\|,./?]+$/,
    //   'Поле "about" может содержать цифры, буквы латинского и кириллического алфавита, а также специальные символы'
    city: z.string().min(3),
    country: z.string().min(3),
    // ),
    dateOfBirth: z
      .string()
      .min(10, 'Дата введена неполностью')
      .regex(/^\d{2}\.\d{2}\.\d{4}$/, t.profile.settings.schema.wrongDateFormat)
      .refine(date => {
        const [day, month, year] = date.split('.').map(Number)
        const dateObj = new Date(year, month - 1, day)

        return (
          dateObj.getFullYear() === year &&
          dateObj.getMonth() === month - 1 &&
          dateObj.getDate() === day
        )
      }, 'Введена недействительная дата'),
    firstName: z
      .string()
      .min(1)
      .regex(/^[a-zA-Zа-яА-Я]+$/, t.profile.settings.schema.onlyLetters),
    lastName: z
      .string()
      .min(1)
      .regex(/^[a-zA-Zа-яА-Я]+$/, t.profile.settings.schema.onlyLetters),
    userName: z
      .string()
      .min(6)
      .regex(/^[0-9A-Za-z_-]+$/, t.profile.settings.schema.userName),
  })

export type UserGeneralInfoData = z.infer<ReturnType<typeof userGeneralInfoSchema>>
