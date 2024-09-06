import { inctagramService } from '@/services/inctagram.service'
import { inctagramSessionsService } from '@/services/inctagram.sessions.service'

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
      logout: builder.mutation<void, void>({
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          await dispatch(inctagramSessionsService.endpoints.deleteAllSessions.initiate())
          await queryFulfilled
          localStorage.removeItem('token')
          document.cookie = `access_token=; expires=${new Date('1970-09-04').toUTCString()}; SameSite=None; Secure`
        },
        query: () => {
          return {
            method: 'POST',
            url: '/v1/auth/logout',
          }
        },
      }),
    }
  },
})

export const { useAuthMeQuery, useLoginMutation, useLogoutMutation } = inctagramAuthService
