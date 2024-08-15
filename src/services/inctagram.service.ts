import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const inctagramService = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://inctagram.work/api',
    baseUrl: 'https://gateway.incta.team/api',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token')

      headers.set('Authorization', `Bearer ${token}`)

      return headers
    },
  }),
  endpoints: builder => ({}),
  reducerPath: 'inctagramService',
  tagTypes: ['login', 'getFollowing'],
})
