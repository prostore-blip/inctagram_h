import { inctagramService } from '@/services/inctagram.service'

//todo изменить эндпоинт, если нужно
export const inctagramAuthService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      authMe: builder.query<any, void>({
        query: () => {
          return { url: '/v1/auth/me' }
        },
      }),
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

export const { useAuthMeQuery, useLoginMutation } = inctagramAuthService
