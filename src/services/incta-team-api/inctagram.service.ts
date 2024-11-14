import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from './inctagram.fetch-base-query'

export const inctaTeamApiService = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
  reducerPath: 'incta-team-api',
  tagTypes: ['login', 'getFollowing', 'ME', 'followers', 'followings', 'profile'],
})

//I am following => my followings
//I am followed by => followers
