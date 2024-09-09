import { inctagramService } from '@/services/inctagram.service'
import { SignInRequest, SignUpRequest } from './instagramm.auth.type'
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
            url: '/users/forgot-password',
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
            url: '/users/reset-password',
          }
        },
      }),
      authGet: builder.query<any, void>({
        providesTags: ['login'],
        query: params => {
          return {
            url: `/auth/me`,
          }
        },
      }),
      singUp: builder.mutation<any, SignUpRequest>({
        invalidatesTags: ['login'],
        query: params => ({
          body: { ...params, captchaToken: params.captchaToken },
          method: 'POST',
          url: '/auth/signup',
        }),
      }),
      singIn: builder.mutation<any, SignInRequest>({
        invalidatesTags: ['login'],
        query: params => ({
          body: { ...params, captchaToken: params.captchaToken },
          method: 'POST',
          url: '/auth/signin',
        }),
      }),
      logout: builder.mutation<any, any>({
        invalidatesTags: ['login'],
        query: params => ({
          body: params,
          method: 'POST',
          url: '/auth/logout',
        }),
      }),
      rotateToken: builder.mutation<any, any>({
        invalidatesTags: ['login'],
        query: params => ({
          body: params,
          method: 'POST',
          url: '/auth/rotate-token',
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
