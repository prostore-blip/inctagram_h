import { UserGeneralInfoData } from '@/components/profile-settings/general-info-form/schema'
import { ResponseDataUserProfile, ResponseDataUserProfileByUserName } from '@/pages/profile/types'
import { inctagramService } from '@/services/inctagram.service'
import { SuccessfulRequestResult } from '@/types'

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
        providesTags: ['getFollowing'],
        query: arg => {
          return { url: `/v1/users/${arg}` }
        },
      }),
      updateProfile: builder.mutation<SuccessfulRequestResult, UserGeneralInfoData>({
        invalidatesTags: ['me'],
        query: body => {
          return {
            body,
            method: 'PUT',
            url: '/v1/users/update-meta',
          }
        },
      }),
    }
  },
})

export const { useGetUserProfileByUserIdQuery, useGetUserProfileQuery, useUpdateProfileMutation } =
  inctagramUsersProfileService
