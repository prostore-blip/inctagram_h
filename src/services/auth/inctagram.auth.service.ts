import { inctagramService } from '@/services/inctagram.service'
import { getResponse, SignedInResponse, SignedUpResponse, SingInRequest, SungUpRequest } from './instagramm.auth.type'

export const inctagramAuthService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      authMe: builder.query<any, getResponse>({
        providesTags: ['login'],
        query: (params) => {
          return { url: `/v1/auth/external/?agreement=${params.agreement}&provider=${params.provider}` };
        },
      }),
      singUp: builder.mutation<SignedUpResponse, SungUpRequest>({
        invalidatesTags: ['login'],
        query: params =>({
          body: params,
          method: 'POST',
          url: '/v1/auth/local/signup',
        }) 
      }),
      singIn: builder.mutation<SignedInResponse, SingInRequest>({
        invalidatesTags: ['login'],
        query: params => ({
          body: params,
          method: 'POST',
          url: '/v1/auth/local/signin',
        })
      }),
      logout: builder.mutation<any, any>({
        invalidatesTags: ['login'],
        query: params => ({
          body: params,
          method: 'POST',
          url: '/v1/auth/logout',
        })
      }),
      rotateToken: builder.mutation<any, any>({
        invalidatesTags: ['login'],
        query: params => ({
          body: params,
          method: 'POST',
          url: '/v1/auth/rotate-token',
        })
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

export const { useSingInMutation, useSingUpMutation, useAuthMeQuery, useLogoutMutation } = inctagramAuthService
