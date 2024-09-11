import { ForgotPasswordRequestData, ResetPasswordRequestData } from '@/components'
import { inctagramService } from '@/services/inctagram.service'
import { SuccessfulRequestResult } from '@/types'

import { AuthGetResponse, SignInRequest, SignUpRequest } from './instagramm.auth.type'

export const inctagramAuthService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      authGet: builder.query<AuthGetResponse, void>({
        providesTags: ['login'],
        query: params => {
          return {
            url: `/auth/me`,
          }
        },
      }),

      forgotPassword: builder.mutation<SuccessfulRequestResult, ForgotPasswordRequestData>({
        query: ({ email, recaptcha }) => {
          const body = {
            'email-or-login': email,
            'recaptcha-token': recaptcha,
          }

          return {
            body,
            method: 'POST',
            url: '/users/forgot-password',
          }
        },
      }),
      logout: builder.mutation<any, any>({
        invalidatesTags: ['login'],
        query: params => ({
          body: params,
          method: 'POST',
          url: '/auth/logout',
        }),
      }),
      resetPassword: builder.mutation<void, ResetPasswordRequestData>({
        query: ({ password, recaptcha, repeatPassword, token }) => {
          const body = {
            password,
            'recaptcha-token': recaptcha,
            'repeat-password': repeatPassword,
            token,
          }

          return {
            body,
            method: 'POST',
            url: '/users/reset-password',
          }
        },
      }),
      rotateToken: builder.mutation<any, any>({
        invalidatesTags: ['login'],
        query: params => ({
          body: params,
          method: 'POST',
          url: '/auth/rotate-token',
        }),
      }),
      singIn: builder.mutation<any, SignInRequest>({
        invalidatesTags: ['login'],
        query: params => ({
          body: params,
          method: 'POST',
          url: '/auth/signin',
        }),
      }),
      singUp: builder.mutation<any, SignUpRequest>({
        invalidatesTags: ['login'],
        query: params => ({
          body: params,
          method: 'POST',
          url: '/auth/signup',
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

export const {
  useAuthGetQuery,
  useForgotPasswordMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useSingInMutation,
  useSingUpMutation,
} = inctagramAuthService
