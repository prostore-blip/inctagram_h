import { inctaTeamApiService } from '@/services/incta-team-api/inctagram.service'

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

export type ProfileDataType = {
  about: string
  birthDate: string
  createdAt: string
  firstName: string
  id: string
  lastName: string
  location: {
    city: string
    country: string
  }
  userName: string
}
export const profileService = inctaTeamApiService.injectEndpoints({
  endpoints: builder => {
    return {
      getProfile: builder.query<ProfileDataType, { id: string }>({
        // query: ({ id }) => `/v1/users/profiles/${id}`,
        async queryFn() {
          return { data: mockDataGetProfile }
        },
      }),
    }
  },
})

export const { useGetProfileQuery } = profileService
