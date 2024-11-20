import { inctaTeamApiService } from '@/services/incta-team-api/inctagram.service'
import {
  CreateProfileRequestBody,
  ProfileDataType,
  UpdateProfileRequestBody,
} from '@/services/incta-team-api/profile/types'

const mockDataGetProfile: ProfileDataType = {
  about:
    'A software developer with 10 years of experience... ' +
    'A software developer with 10 years of experience... ' +
    'A software developer with 10 years of experience... ' +
    'A software developer with 10 years of experience...',
  birthDate: '1990-01-01',
  createdAt: '2023-09-01T12:00:00Z',
  firstName: 'John',
  id: 'q1',
  lastName: 'Doe',
  location: {
    city: 'New York',
    country: 'USA',
  },
  userName: 'johnDoe',
}

export const profileService = inctaTeamApiService.injectEndpoints({
  endpoints: builder => {
    return {
      createProfile: builder.mutation<ProfileDataType, CreateProfileRequestBody>({
        invalidatesTags: (result, _error, _args) =>
          result ? [{ id: result.id, type: 'profile' }] : [],
        query: body => ({
          body,
          method: 'POST',
          url: '/v1/users/profiles/create',
        }),
      }),
      getMyProfile: builder.query<ProfileDataType, void>({
        query: () => `/v1/users/profiles/me`,
      }),
      getProfile: builder.query<ProfileDataType, { id: string }>({
        // query: ({ id }) => `/v1/users/profiles/${id}`,
        async queryFn() {
          return { data: mockDataGetProfile }
        },
      }),
      getProfileById: builder.query<ProfileDataType, { id: string }>({
        providesTags: (_result, _error, args) => [{ id: args.id, type: 'profile' }],
        query: ({ id }) => `/v1/users/profiles/${id}`,
      }),
      getProfilesList: builder.query<ProfileDataType, void>({
        providesTags: [{ id: 'list', type: 'profile' }],
        query: () => `/v1/users/profiles/all`,
      }),
      updateProfile: builder.mutation<ProfileDataType, UpdateProfileRequestBody>({
        invalidatesTags: (result, _error, _args) =>
          result ? [{ id: result.id, type: 'profile' }] : [],
        query: body => ({
          body,
          method: 'POST',
          url: '/v1/users/profiles/edit',
        }),
      }),
    }
  },
})

export const {
  useCreateProfileMutation,
  useGetMyProfileQuery,
  useGetProfileByIdQuery,
  useGetProfileQuery,
  useGetProfilesListQuery,
  useUpdateProfileMutation,
} = profileService
