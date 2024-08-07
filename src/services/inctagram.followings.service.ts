import { ResponseDataUserProfile } from '@/pages/userProfile/types'
import { inctagramService } from '@/services/inctagram.service'

export const inctagramUsersFollowingsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      deleteFolowerFromFolowers: builder.mutation<any, any>({
        query: args => {
          return { method: 'DELETE', url: `/v1/users/follower/${args.userId}` }
        },
      }),
      getProfileUsers: builder.query<any, any>({
        query: args => {
          return { params: args ? args : undefined, url: `/v1/users` }
        },
      }),
      updateSubscriptionToUser: builder.mutation<any, any>({
        query: body => {
          return { body, method: 'POST', url: `/v1/users/following` }
        },
      }),
    }
  },
})

export const { useDeleteFolowerFromFolowersMutation, useGetProfileUsersQuery } =
  inctagramUsersFollowingsService
