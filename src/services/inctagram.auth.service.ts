import { inctagramService } from '@/services/inctagram.service'

export const inctagramAuthService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      authMe: builder.query<any, void>({
        providesTags: ['login'],
        query: () => {
          return { url: '/v1/auth/me' }
        },
      }),
      login: builder.mutation<any, any>({
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          const res = await queryFulfilled

          localStorage.setItem('token', res.data.accessToken)
          /**
           * добавляем свою куку с токеном. Это нужно для выполнения запросов на защищённые эндпоинты при SSR, SSG
           */
          //TODO время 'expires=' в куке внутри login выбрано произвольно. Необходимо ли синхронизировать его с временем из куки, но там непонятное время - 1970год
          document.cookie = `access_token=${res.data.accessToken}; expires=${new Date('2050-09-04').toUTCString()}; SameSite=None; Secure`
          dispatch(inctagramAuthService.util.invalidateTags(['login']))
        },
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
