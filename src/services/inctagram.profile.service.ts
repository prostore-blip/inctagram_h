import { ResponseDataUserProfile, ResponseDataUserProfileByUserName } from '@/pages/profile/types'
import { inctagramService } from '@/services/inctagram.service'

export const inctagramUsersProfileService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getUserProfile: builder.query<ResponseDataUserProfile, void>({
        // providesTags: ['login'],
        query: () => {
          return { url: 'users/profiles/get' }
        },
      }),
      getUserProfileByUserId: builder.query<ResponseDataUserProfileByUserName, string>({
        // providesTags: ['login'],
        providesTags: ['getFollowing'],
        query: arg => {
          return { url: `users/${arg}` }
        },
      }),
    }
  },
})

export const { useGetUserProfileByUserIdQuery, useGetUserProfileQuery } =
  inctagramUsersProfileService
