import { ACCESS_TOKEN_STORAGE_NAME } from '@/services/incta-team-api/auth/const'
import { isRefreshTokenResponse } from '@/services/incta-team-api/auth/instagram.auth.type'
import { isFetchBaseQueryError, isFetchBaseQueryErrorData } from '@/types'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://incta.team/api',
  credentials: 'include',
  prepareHeaders: headers => {
    const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_NAME)

    //wtf???
    // headers.set('Authorization', `Bearer 6LcXfikqAAAAAEtJf27WMmB70tR2xlm2A3Jlgz6P`)
    headers.set('Authorization', `Bearer ${token}`)

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  //todo ask for different status?
  //todo check type guard - why the first didn't fully work?
  if (
    isFetchBaseQueryError(result?.error) &&
    result.error.status === 401 &&
    isFetchBaseQueryErrorData(result.error.data) &&
    result.error.data.error !== 'User not found'
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const res = await baseQuery(
          {
            credentials: 'include',
            method: 'POST',
            url: '/v1/auth/refresh-token',
          },
          api,
          extraOptions
        )

        console.log({ res })
        //todo use http only cookies? (can't be read via js client side -> api route)
        //or some session manager?
        if (isRefreshTokenResponse(res)) {
          localStorage.setItem('accessToken', res.data.accessToken)
          result = await baseQuery(args, api, extraOptions)
        }
        if (!res.data) {
          // void Router.push('/login')
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
