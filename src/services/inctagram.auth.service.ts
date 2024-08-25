import { ResetPasswordRequestData } from '@/components'
import { ForgotPasswordRequestData } from '@/components/auth/forgotPassword/schema'
import { inctagramService } from '@/services/inctagram.service'
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
    }
  },
})

export const {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = inctagramAuthService
