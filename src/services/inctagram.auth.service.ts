import { inctagramService } from '@/services/inctagram.service'

//todo изменить эндпоинт, если нужно
export const inctagramAuthService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<any, any>({
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/v1/auth/login',
          }
        },
      }),
    }
  },
})

export const { useLoginMutation } = inctagramAuthService
