import { inctagramService } from '@/services/inctagram.service'
import { getResponse, Respones, SignInRequest, SignUpRequest } from './instagramm.auth.type'
import { ForgotPasswordRequestData, ResetPasswordRequestData } from '@/components'
import { SuccessfulRequestResult } from '@/types'

export const inctagramAuthService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      forgotPassword: builder.mutation<SuccessfulRequestResult, ForgotPasswordRequestData>({
        query: ({ email, recaptcha }) => {
          const body = {
            'email-or-login': email,
            'recaptcha-token': recaptcha,
          }

          return {
            body,
            method: 'POST',
            url: '/v1/users/forgot-password',
          }
        },
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
            url: '/v1/users/reset-password',
          }
        },
      }),
      authGet: builder.query<any, void>({
        providesTags: ['login'],
        query: params => {
          return {
            url: `/v1/auth/external/?agreement=${params}&provider=${params}`,
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

export const {
  useSingInMutation,
  useSingUpMutation,
  useAuthGetQuery,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = inctagramAuthService
