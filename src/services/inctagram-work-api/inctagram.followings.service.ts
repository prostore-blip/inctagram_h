import {
  FollowersUsersType,
  RequestForFollowersUsers,
  RequestType,
  UsersType,
} from '@/components/modal-followers/types'
import { inctagramWorkApiService } from '@/services/inctagram-work-api/inctagram.service'

export const inctagramUsersFollowingsService = inctagramWorkApiService.injectEndpoints({
  endpoints: builder => {
    return {
      deleteFolowerFromFolowers: builder.mutation<void, number>({
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          await queryFulfilled

          dispatch(inctagramUsersFollowingsService.util.invalidateTags(['getFollowing']))
        },
        query: userId => {
          return { method: 'DELETE', url: `/v1/users/follower/${userId}` }
        },
      }),
      followToUser: builder.mutation<void, { selectedUserId: number }>({
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          await queryFulfilled

          dispatch(inctagramUsersFollowingsService.util.invalidateTags(['getFollowing']))
        },
        query: body => {
          return { body, method: 'POST', url: `/v1/users/following` }
        },
      }),
      getFollowersUsers: builder.query<RequestType<FollowersUsersType>, RequestForFollowersUsers>({
        providesTags: ['getFollowing'],
        query: args => {
          return {
            params: args.params ? args.params : undefined,
            url: `/v1/users/${args.username}/followers`,
          }
        },
      }),
      getFollowingUsers: builder.query<RequestType<FollowersUsersType>, RequestForFollowersUsers>({
        providesTags: ['getFollowing'],
        query: args => {
          return {
            params: args.params ? args.params : undefined,
            url: `/v1/users/${args.username}/following`,
          }
        },
      }),
      getProfileUsers: builder.query<RequestType<UsersType>, void>({
        query: () => {
          return { url: `/v1/users` }
        },
      }),
    }
  },
})

export const {
  useDeleteFolowerFromFolowersMutation,
  useFollowToUserMutation,
  useGetFollowersUsersQuery,
  useGetFollowingUsersQuery,
  useGetProfileUsersQuery,
} = inctagramUsersFollowingsService
