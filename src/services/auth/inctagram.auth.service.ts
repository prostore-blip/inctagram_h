import { inctagramService } from '@/services/inctagram.service'
import { getResponse, Respones, SignInRequest, SignUpRequest } from './instagramm.auth.type'

export const inctagramAuthService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      authGet: builder.query<any, getResponse>({
        providesTags: ['login'],
        query: params => {
          return {
            url: `/v1/auth/external/?agreement=${params.agreement}&provider=${params.provider}`,
          }
        },
      }),
      singUp: builder.mutation<Respones, SignUpRequest>({
        invalidatesTags: ['login'],
        query: params => ({
          body: params,
          method: 'POST',
          url: '/v1/auth/local/signup',
        }),
      }),
      singIn: builder.mutation<Respones, SignInRequest>({
        invalidatesTags: ['login'],
        query: params => ({
          body: params,
          method: 'POST',
          url: '/v1/auth/local/signin',
        }),
      }),
      logout: builder.mutation<Respones, any>({
        invalidatesTags: ['login'],
        query: params => ({
          body: params,
          method: 'POST',
          url: '/v1/auth/logout',
        }),
      }),
      rotateToken: builder.mutation<Respones, any>({
        invalidatesTags: ['login'],
        query: params => ({
          body: params,
          method: 'POST',
          url: '/v1/auth/rotate-token',
        }),
      }),
      
      // login: builder.mutation<any, any>({
      //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //     const res = await queryFulfilled

      //     localStorage.setItem('token', res.data.accessToken)
      //     dispatch(inctagramAuthService.util.invalidateTags(['login']))
      //   },
      //   query: params => {
      //     return {
      //       body: params,
      //       method: 'POST',
      //       url: '/v1/auth/login',
      //     }
      //   },
      // }),
    }
  },
})

export const { useSingInMutation, useSingUpMutation, useAuthGetQuery, useLogoutMutation } =
  inctagramAuthService
