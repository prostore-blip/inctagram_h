import { ForgotPasswordRequestData, ResetPasswordRequestData } from '@/components'
import { ACCESS_TOKEN_STORAGE_NAME } from '@/services/incta-team-api/common/const'
import { inctaTeamApiService } from '@/services/incta-team-api/inctagram.service'
import { SuccessfulRequestResult } from '@/types'

import {
  MeResponse,
  RegistrationConfirmationArgs,
  ResponseWithAccessToken,
  SignInRequestBody,
  SignUpRequest,
} from './instagram.auth.type'

export const authService = inctaTeamApiService.injectEndpoints({
  endpoints: builder => {
    return {
      authMe: builder.query<MeResponse, void>({
        providesTags: ['ME'],
        query: () => {
          return { url: '/v1/auth/me' }
        },
      }),
      confirmEmailRegistration: builder.mutation<void, RegistrationConfirmationArgs>({
        query: body => ({
          body,
          method: 'POST',
          url: '/v1/auth/registration-confirmation',
        }),
      }),

      logout: builder.mutation<void, void>({
        //todo purge localstorage
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          //maybe custom queryFn will suit here more
          //throwing error 401 but seems to work (removes refresh token from cookies)
          // await queryFulfilled //the below code won't get executed with this

          localStorage.removeItem(ACCESS_TOKEN_STORAGE_NAME)
          dispatch(authService.util.resetApiState())
        },
        query: () => ({
          method: 'POST',
          url: '/v1/auth/logout',
        }),
      }),
      passwordRecovery: builder.mutation<SuccessfulRequestResult, ForgotPasswordRequestData>({
        query: ({ email, recaptcha }) => {
          const body = {
            email,
          }

          return {
            body,
            headers: { captchaToken: `${recaptcha}` },
            method: 'POST',
            url: '/v1/auth/password-recovery',
          }
        },
      }),

      resetPassword: builder.mutation<void, ResetPasswordRequestData>({
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/v1/auth/new-password',
          }
        },
      }),
      signIn: builder.mutation<ResponseWithAccessToken, SignInRequestBody>({
        invalidatesTags: ['ME'],
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          const res = await queryFulfilled

          if (res?.data?.accessToken) {
            localStorage.setItem(ACCESS_TOKEN_STORAGE_NAME, res.data.accessToken)
          }
        },
        query: ({ captchaToken, ...body }) => {
          return {
            body,
            headers: {
              captchaToken: `${captchaToken}`,
            },
            method: 'POST',
            url: '/v1/auth/signin',
          }
        },
      }),
      signUp: builder.mutation<void, SignUpRequest>({
        query: ({ captchaToken, ...body }) => ({
          body,
          headers: {
            captchaToken: `${captchaToken}`,
          },
          method: 'POST',
          url: '/v1/auth/signup',
        }),
      }),
    }
  },
})

export const {
  useAuthMeQuery,
  useConfirmEmailRegistrationMutation,
  useLogoutMutation,
  usePasswordRecoveryMutation,
  useResetPasswordMutation,
  useSignInMutation,
  // useSingInMutation,
  useSignUpMutation,
} = authService
