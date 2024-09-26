import { inctaTeamApiService } from '@/services/incta-team-api/inctagram.service'

const mockDataGetPostsByUserId = [
  {
    description: 'This is a description of the post',
    id: '1234-abcd-5678-efgh',
    image: 'https://example.com/image.jpg',
    userId: 'abcd-1234-efgh-5678',
  },
  {
    description: 'This is a description of the post',
    id: '1234-abcd-5678-efgh',
    image: 'https://example.com/image.jpg',
    userId: 'abcd-1234-efgh-5678',
  },
  {
    description: 'This is a description of the post',
    id: '1234-abcd-5678-efgh',
    image: 'https://example.com/image.jpg',
    userId: 'abcd-1234-efgh-5678',
  },
  {
    description: 'This is a description of the post',
    id: '1234-abcd-5678-efgh',
    image: 'https://example.com/image.jpg',
    userId: 'abcd-1234-efgh-5678',
  },
]

export type Post = {
  description: string
  id: string
  image: string
  userId: string
}

const commentsMock = {
  items: [
    {
      answerCount: 0,
      content: 'asdaa',
      createdAt: '2024-09-25T19:13:10.430Z',
      from: {
        avatars: [{}],
        id: '0',
        username: 'UserName111',
      },
      id: '1',
      isLiked: true,
      likeCount: 0,
      postId: '3',
    },
  ],
  pageSize: 12,
  totalCount: 100,
}

export const postsService = inctaTeamApiService.injectEndpoints({
  endpoints: builder => {
    return {
      getComments: builder.query<any, void>({
        // query: ({ id }) => `/v1/posts/${id}/posts`,
        async queryFn() {
          return { data: commentsMock }
        },
      }),
      getPostsByUserId: builder.query<any, { id: string }>({
        // query: ({ id }) => `/v1/posts/${id}/posts`,
        async queryFn() {
          return { data: mockDataGetPostsByUserId }
        },
      }),
    }
  },
})

export const { useGetCommentsQuery, useGetPostsByUserIdQuery } = postsService
