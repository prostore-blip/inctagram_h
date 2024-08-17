import { ResponseDataUserProfile, ResponseDataUserProfileByUserName } from '@/pages/profile/types'
import { inctagramService } from '@/services/inctagram.service'

export const inctagramUsersProfileService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getMyProfile: builder.query<ResponseDataUserProfile, void>({
        // providesTags: ['login'],
        query: () => {
          return { url: '/v1/users/profile' }
        },
      }),
      getUserProfileByUserName: builder.query<
        ResponseDataUserProfileByUserName,
        string | undefined
      >({
        // providesTags: ['login'],
        providesTags: ['getFollowing'],
        query: arg => {
          return { url: `/v1/users/${arg}` }
        },
      }),
    }
  },
})

export const { useGetMyProfileQuery, useGetUserProfileByUserNameQuery } =
  inctagramUsersProfileService
