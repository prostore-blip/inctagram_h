import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

// eslint-disable-next-line no-duplicate-imports
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
// create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://inctagram.work/api',
  credentials: 'include',
  prepareHeaders: headers => {
    const token = localStorage.getItem('token')

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          {
            credentials: 'include',
            method: 'POST',
            url: '/v1/auth/update-tokens',
          },
          api,
          extraOptions
        )

        if (
          typeof refreshResult.data === 'object' &&
          refreshResult.data !== null &&
          'accessToken' in refreshResult.data &&
          refreshResult.data?.accessToken &&
          typeof refreshResult.data?.accessToken === 'string'
        ) {
          document.cookie = `access_token=${refreshResult.data.accessToken}; expires=${new Date('2050-09-04').toUTCString()}; SameSite=None; Secure`
          localStorage.setItem('token', refreshResult.data.accessToken)
          result = await baseQuery(args, api, extraOptions)
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
