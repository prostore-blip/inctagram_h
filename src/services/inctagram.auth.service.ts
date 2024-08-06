import { RecoveryLinkRequestData } from '@/components/auth/forgotPassword/schema'
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
      checkRecoveryCode: builder.mutation<void, { recoveryCode: string }>({
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/v1/auth/check-recovery-code',
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
      recoverPassword: builder.mutation<void, RecoveryLinkRequestData>({
        query: ({ email, recaptcha }) => {
          const body = {
            baseUrl:
              process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000'
                : 'https://incta.team',
            email,
            recaptcha,
          }

          return {
            body,
            method: 'POST',
            url: '/v1/auth/password-recovery',
          }
        },
      }),
      setNewPassword: builder.mutation<void, { newPassword: string; recoveryCode: string }>({
        query: body => {
          return {
            body,
            method: 'POST',
            url: '/v1/auth/new-password',
          }
        },
      }),
    }
  },
})

export const {
  useAuthMeQuery,
  useCheckRecoveryCodeMutation,
  useLoginMutation,
  useRecoverPasswordMutation,
  useSetNewPasswordMutation,
} = inctagramAuthService
