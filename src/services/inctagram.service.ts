import { baseQueryWithReauth } from '@/services/inctagram.fetch-base-query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const inctagramService = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
  reducerPath: 'inctagramService',
  tagTypes: [
    'currentSubscrioption',
    'login',
    'getFollowing',
    'getMyProfile',
    'getPostsByUserId',
    'getSessions',
  ],
})
