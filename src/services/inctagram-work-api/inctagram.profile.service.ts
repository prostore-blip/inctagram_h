import { inctagramWorkApiService } from '@/services/inctagram-work-api/inctagram.service'
import { ResponseDataUserProfile, ResponseDataUserProfileByUserName } from '@/types/user-data'

export const inctagramUsersProfileService = inctagramWorkApiService.injectEndpoints({
  endpoints: builder => {
    return {
      getUserProfile: builder.query<ResponseDataUserProfile, void>({
        // providesTags: ['login'],
        query: () => {
          return { url: '/v1/users' }
        },
      }),
      getUserProfileByUserId: builder.query<ResponseDataUserProfileByUserName, string>({
        // providesTags: ['login'],
        providesTags: ['getFollowing'],
        query: arg => {
          return { url: `/v1/users/${arg}` }
        },
      }),
    }
  },
})

export const { useGetUserProfileByUserIdQuery, useGetUserProfileQuery } =
  inctagramUsersProfileService
