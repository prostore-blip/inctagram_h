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
           * Через "split" берём среднюю часть (payload) JWT токена и
           * через "atob" декодируем её из формата Base64.
           * Конкретно в мданном случае в payload сидит userId и даты создания токена
           * и его протухания в секундах
           */
          const payloadFromJWT = JSON.parse(atob(res.data.accessToken?.split('.')[1]))

          /**
           * Дата протухания токена указана в секундах,
           * умножая на 1000, переводим в миллисекунды и определяем дату протухания в UTC формате
           * далее используем в кастомной куке. Это нужно для того, чтобы кука протухла в нужный момент.
           * Иначе (если захардкодить дату протухания) при закрытии браузера и повторном его открытии
           * неправильно будет работать логика SSR для "[id]"
           */
          const dateExparedAccessToken = new Date(payloadFromJWT.exp * 1000).toUTCString()

          /**
           * добавляем свою куку с токеном. Это нужно для выполнения запросов
           * на защищённые эндпоинты при SSR, SSG
           */
          document.cookie = `access_token=${res.data.accessToken}; expires=${dateExparedAccessToken}; SameSite=None; Secure`
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
          await queryFulfilled
          await dispatch(inctagramSessionsService.endpoints.deleteAllSessions.initiate())
          localStorage.removeItem('token')
          document.cookie = `access_token=; expires=${new Date('1970-09-04').toUTCString()}; SameSite=None; Secure`
          dispatch(inctagramAuthService.util.invalidateTags(['login']))
          dispatch(inctagramAuthService.util.resetApiState())
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
