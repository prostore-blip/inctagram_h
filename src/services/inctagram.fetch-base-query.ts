import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import Router from 'next/router'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://incta.team/api/v1/',
  prepareHeaders: headers => {
    headers.set('Content-type', 'application/json')
    return headers
  },
  credentials: 'include',
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
          {
            method: 'POST',
            url: '/v1/auth/update-tokens',
            credentials: 'include',
          },
          api,
          extraOptions
        )

        if (!refreshResult.data) {
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