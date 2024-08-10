import {
  FollowersUsersType,
  RequestForFollowersUsers,
  RequestType,
  UsersQueryParamsType,
  UsersType,
} from '@/components/ModalFollowers/types'
import { inctagramService } from '@/services/inctagram.service'

export const inctagramUsersFollowingsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      deleteFolowerFromFolowers: builder.mutation<void, number>({
        query: userId => {
          return { method: 'DELETE', url: `/v1/users/follower/${userId}` }
        },
      }),
      followToUser: builder.mutation<void, { selectedUserId: number }>({
        query: body => {
          return { body, method: 'POST', url: `/v1/users/following` }
        },
      }),
      getFollowersUsers: builder.query<RequestType<FollowersUsersType>, RequestForFollowersUsers>({
        query: args => {
          return {
            params: args.params ? args.params : undefined,
            url: `/v1/users/${args.username}/followers`,
          }
        },
      }),
      getProfileUsers: builder.query<RequestType<UsersType>, UsersQueryParamsType>({
        query: args => {
          return { params: args ? args : undefined, url: `/v1/users` }
        },
      }),
    }
  },
})

export const {
  useDeleteFolowerFromFolowersMutation,
  useFollowToUserMutation,
  useGetFollowersUsersQuery,
  useGetProfileUsersQuery,
} = inctagramUsersFollowingsService
