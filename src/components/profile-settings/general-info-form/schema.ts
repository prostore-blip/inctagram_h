import { z } from 'zod'

export const userGeneralInfoSchema = z.object({
  about: z.string().optional(),
  // .regex(
  //   /^[0-9A-Za-zА-Яа-я\s!@#$%^&*()_+\-=[\]{};':"\\|,./?]+$/,
  //   'Поле "about" может содержать цифры, буквы латинского и кириллического алфавита, а также специальные символы'
  // ),
  birthday: z
    .string()
    .min(10, 'Дата введена неполностью')
    .regex(/^\d{2}\.\d{2}\.\d{4}$/, 'Дата должна быть в формате ДД.ММ.ГГГГ')
    .refine(date => {
      const [day, month, year] = date.split('.').map(Number)
      const dateObj = new Date(year, month - 1, day)

      return (
        dateObj.getFullYear() === year &&
        dateObj.getMonth() === month - 1 &&
        dateObj.getDate() === day
      )
    }, 'Введена недействительная дата'),
  city: z.string().min(3),
  country: z.string().min(3),
  login: z
    .string()
    .min(6)
    .regex(
      /^[0-9A-Za-z_-]+$/,
      'Логин может содержать цифры, буквы латинского и кириллического алфавита, а также специальные символы'
    ),
  name: z
    .string()
    .min(1)
    .regex(
      /^[a-zA-Zа-яА-Я]+$/,
      'Имя должно содержать только буквы латинского алфавита или кириллицы'
    ),
  surname: z
    .string()
    .min(1)
    .regex(
      /^[a-zA-Zа-яА-Я]+$/,
      'Фамилия должна содержать только буквы латинского алфавита или кириллицы'
    ),
})

export type UserGeneralInfoData = z.infer<typeof userGeneralInfoSchema>
