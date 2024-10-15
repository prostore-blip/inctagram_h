import { isRefreshTokenResponse } from '@/services/incta-team-api/auth/instagram.auth.type'
import { ACCESS_TOKEN_STORAGE_NAME } from '@/services/incta-team-api/common/const'
import { isFetchBaseQueryError, isFetchBaseQueryErrorData } from '@/types'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://gateway.netchill.ru/api',
  credentials: 'include',
  prepareHeaders: headers => {
    const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_NAME)

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

        //todo use http only cookies? (can't be read via js client side -> api route)
        //or some session manager (next-auth/auth.js)?
        if (isRefreshTokenResponse(res)) {
          localStorage.setItem(ACCESS_TOKEN_STORAGE_NAME, res.data.accessToken)
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
