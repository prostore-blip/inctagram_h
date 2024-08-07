import {
  ResponseDataUserProfile,
  ResponseDataUserProfileByUserName,
} from '@/pages/userProfile/types'
import { inctagramService } from '@/services/inctagram.service'

export const inctagramUsersProfileService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getUserProfile: builder.query<ResponseDataUserProfile, void>({
        // providesTags: ['login'],
        query: () => {
          return { url: '/v1/users/profile' }
        },
      }),
      getUserProfileByUserId: builder.query<ResponseDataUserProfileByUserName, string>({
        // providesTags: ['login'],
        query: arg => {
          return { url: `/v1/users/${arg}` }
        },
      }),
    }
  },
})

export const { useGetUserProfileByUserIdQuery, useGetUserProfileQuery } =
  inctagramUsersProfileService
