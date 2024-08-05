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
          dispatch(inctagramAuthService.util.invalidateTags(['login']))
        },
        query: params => {
          return {
            body: params,
            method: 'POST',
            url: '/v1/auth/login',
          }
        },
      }),
    }
  },
})

export const { useAuthMeQuery, useLoginMutation } = inctagramAuthService
