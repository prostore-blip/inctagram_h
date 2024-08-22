import { ResetPasswordRequestData } from '@/components'
import { ForgotPasswordRequestData } from '@/components/auth/forgotPassword/schema'
import { inctagramService } from '@/services/inctagram.service'
import { User } from '@/services/profile/types'
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
      // me: builder.query<User, void>({
      //   providesTags: ['me'],
      //   query: _ => ({
      //     method: 'GET',
      //     url: '/v1/users/me',
      //   }),
      // }),

      //mocked me endpoint
      me: builder.query<User, void>({
        providesTags: ['me'],
        queryFn: async (_args, _api, _extraOptions, baseQuery) => {
          try {
            await baseQuery({
              method: 'GET',
              url: '/v1/users/me',
            })
          } catch (err) {
            console.log(err)
          }

          return {
            data: {
              id: 'demo-sdfsdfs-sd342f',
              meta: {
                about: 'demo user',
                avatar: null,
                birthday: '',
                city: 'DemoCity',
                name: 'Demo',
                surname: 'User',
              },
              providers: [
                {
                  email: 'demo@user.test',
                  id: 'demo-sdfsdfs-sd342f',
                  login: 'demo_user',
                },
              ],
            },
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
  useMeQuery,
  useResetPasswordMutation,
} = inctagramAuthService
