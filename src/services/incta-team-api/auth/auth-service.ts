import { ForgotPasswordRequestData, ResetPasswordRequestData } from '@/components'
import { SignUpFormData } from '@/components/auth/sign-up/schema'
import { ACCESS_TOKEN_STORAGE_NAME } from '@/services/incta-team-api/common/const'
import { inctaTeamApiService } from '@/services/incta-team-api/inctagram.service'
import { SuccessfulRequestResult } from '@/types'

import {
  MeResponse,
  ResponseWithAccessToken,
  SignInRequestBody,
  SignUpRequest,
} from './instagram.auth.type'

export const authService = inctaTeamApiService.injectEndpoints({
  endpoints: builder => {
    return {
      authMe: builder.query<MeResponse, void>({
        query: () => {
          return { url: '/v1/auth/me' }
        },
      }),
      confirmEmailRegistration: builder.mutation<any, { code: string }>({
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
      // }),
      singUp: builder.mutation<any, SignUpRequest>({
        invalidatesTags: ['login'],
        query: params => ({
          body: params,
          method: 'POST',
<<<<<<< HEAD
          url: '/v1/auth/signup',
=======
          url: '/auth/signup',
>>>>>>> 5379ec216aa90cabc4a5697ee55ea10582573261
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
  useAuthMeQuery,
  useConfirmEmailRegistrationMutation,
  useLogoutMutation,
  usePasswordRecoveryMutation,
  useResetPasswordMutation,
  useSignInMutation,
  // useSingInMutation,
  useSingUpMutation,
} = authService
