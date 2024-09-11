import {
  RequestUpdateProfile,
  ResponseDataUserProfile,
  ResponseDataUserProfileByUserName,
  ResponseUpdateAvatarProfile,
} from '@/pages/profile/types'
import { inctagramService } from '@/services/inctagram.service'

export const inctagramUsersProfileService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getMyProfile: builder.query<ResponseDataUserProfile, void>({
        providesTags: ['getMyProfile'],
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
      updateAvatarProfile: builder.mutation<ResponseUpdateAvatarProfile, { file: FormData }>({
        invalidatesTags: ['getMyProfile'],
        query: body => {
          return {
            body: body.file,
            method: 'POST',
            url: '/v1/users/profile/avatar',
          }
        },
      }),
      updateProfile: builder.mutation<void, RequestUpdateProfile>({
        invalidatesTags: ['getMyProfile'],
        query: body => {
          return {
            body,
            method: 'PUT',
            url: '/v1/users/profile',
          }
        },
      }),
    }
  },
})

export const {
  useGetMyProfileQuery,
  useGetUserProfileByUserNameQuery,
  useUpdateAvatarProfileMutation,
  useUpdateProfileMutation,
} = inctagramUsersProfileService
