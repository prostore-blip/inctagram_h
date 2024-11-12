import { inctaTeamApiService } from '@/services/incta-team-api/inctagram.service'

const mockDataGetPostsByUserId = [
  {
    description: 'This is a description of the post',
    id: 'a11',
    image: 'https://example.com/image.jpg',
    userId: 'a1',
  },
  {
    description: 'This is a description of the post',
    id: 'a12',
    image: 'https://example.com/image.jpg',
    userId: 'a2',
  },
  {
    description: 'This is a description of the post',
    id: 'a13',
    image: 'https://example.com/image.jpg',
    userId: 'a3',
  },
  {
    description: 'This is a description of the post',
    id: 'a14',
    image: 'https://example.com/image.jpg',
    userId: 'a4',
  },
]

export type Post = {
  description: string
  id: string
  image: string
  userId: string
}
export type Comment = {
  answerCount: number
  content: string
  createdAt: string
  from: {
    avatars: {}[]
    id: string
    username: string
  }
  id: string
  isLiked: boolean
  likeCount: number
  postId: string
}

type CommentsMockType = {
  items: Comment[]
  pageSize: number
  totalCount: number
}

const commentsMock: CommentsMockType = {
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
      createPost: builder.mutation<void, FormData>({
        query: body => ({ body, method: 'POST', url: `/v1/posts` }),
      }),
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

export const { useCreatePostMutation, useGetCommentsQuery, useGetPostsByUserIdQuery } = postsService
