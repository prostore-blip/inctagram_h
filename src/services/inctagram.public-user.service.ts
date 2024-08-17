import { inctagramService } from '@/services/inctagram.service'

export const inctagramPublicUserService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getPublicProfileForUserById: builder.query<ResponsePublicProfileUser, number>({
        query: args => {
          return { url: `/v1/public-user/profile/${args}` }
        },
      }),
      getTotalCountRegistredUsers: builder.query<Count, void>({
        query: () => {
          return { url: `/v1/public-user` }
        },
      }),
    }
  },
})

export const { useGetPublicProfileForUserByIdQuery, useGetTotalCountRegistredUsersQuery } =
  inctagramPublicUserService
type Count = {
  totalCount: number
}

type Avatars = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

type ResponsePublicProfileUser = {
  aboutMe: string
  avatars: Avatars[]
  id: number
  userName: string
}
