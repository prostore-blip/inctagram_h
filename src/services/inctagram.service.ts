import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from './inctagram.fetch-base-query'

export const inctagramService = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
  reducerPath: 'inctagramService',
  tagTypes: ['login', 'getFollowing', 'me'],
})
