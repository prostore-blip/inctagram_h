import { ResetPasswordRequestData } from '@/components'
import { ForgotPasswordRequestData } from '@/components/auth/forgotPassword/schema'
import { inctagramService } from '@/services/inctagram.service'
import { SuccessfulRequestResult } from '@/types'

export const inctagramAuthService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      authMe: builder.query<any, void>({
        providesTags: ['login'],
        query: () => {
          return { url: '/v1/auth/me' }
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
            url: '/v1/users/forgot-password',
          }
        },
      }),
      login: builder.mutation<any, any>({
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          const res = await queryFulfilled

          localStorage.setItem('token', res.data.accessToken)
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
    }
  },
})

export const {
  useAuthMeQuery,
  useForgotPasswordMutation,
  useLoginMutation,
  useResetPasswordMutation,
} = inctagramAuthService
