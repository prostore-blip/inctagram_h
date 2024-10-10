import { RequestForFollowersUsers } from '@/services/incta-team-api/followings/types'
import { inctaTeamApiService } from '@/services/incta-team-api/inctagram.service'
export type FollowerItem = {
  avatars: {
    createdAt: string
    fileSize: number
    height: number
    url: string
    width: number
  }[]
  createdAt: string
  id: string
  isFollowedBy: boolean
  isFollowing: boolean
  userId: string
  userName: string
}
const mockDataGetFollowers = {
  items: [
    {
      avatars: [
        {
          createdAt: '2024-09-25T11:02:57.570Z',
          fileSize: 300,
          height: 300,
          url: 'https://example.com/image.jpg',
          width: 300,
        },
      ],
      createdAt: '2021-09-26T18:45:52.682Z',
      id: 'dasf123',
      isFollowedBy: true,
      isFollowing: false,
      userId: '0q123',
      userName: 'Duncan McLaud',
    },
    {
      avatars: [
        {
          createdAt: '2021-09-25T11:02:57.570Z',
          fileSize: 300,
          height: 300,
          url: 'https://example.com/image.jpg',
          width: 300,
        },
      ],
      createdAt: '2024-09-26T18:45:52.682Z',
      id: 'fasf121',
      isFollowedBy: true,
      isFollowing: false,
      userId: '1234w',
      userName: 'BonJovi',
    },
  ],
  nextCursor: 0,
  page: 0,
  pageSize: 0,
  pagesCount: 0,
  prevCursor: 0,
  totalCount: 0,
}

export const followingService = inctaTeamApiService.injectEndpoints({
  endpoints: builder => {
    return {
      followToUser: builder.mutation<any, { selectedUserId: string }>({
        // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //   await queryFulfilled
        //
        //   dispatch(inctagramUsersFollowingsService.util.invalidateTags(['getFollowing']))
        // },
        // query: body => {
        //   return { body, method: 'POST', url: `/v1/users/following` }
        // },
        async queryFn() {
          return { data: null }
        },
      }),
      getFollowersUsers: builder.query<any, RequestForFollowersUsers>({
        providesTags: ['getFollowing'],
        // query: args => {
        //   return {
        //     params: args.params ? args.params : undefined,
        //     url: `/v1/users/${args.username}/followers`,
        //   }
        // },
        async queryFn() {
          return { data: mockDataGetFollowers }
        },
      }),
    }
  },
})

export const { useFollowToUserMutation, useGetFollowersUsersQuery } = followingService
