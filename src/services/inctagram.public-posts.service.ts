import { inctagramService } from '@/services/inctagram.service'

export const inctagramPublicPostsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getAllPosts: builder.query<ResponseAllPosts, GetAllPostsType>({
        query: args => {
          return { params: args.params, url: `/v1/public-posts/all/${args.endCursorPostId}` }
        },
      }),
      getCommentsForPost: builder.query<ResponseCommentsForPost, RequestByComments>({
        query: args => {
          return { params: args.params, url: `/v1/public-posts/${args.postId}/comments` }
        },
      }),
      getPostsByUserId: builder.query<ResponsePostsByUsedId, RequestToPostsByUserId>({
        providesTags: ['getPostsByUserId'],
        query: args => {
          return {
            params: args.params,
            url: `v1/public-posts/user/${args.userId}/${args.endCursorPostId}`,
          }
        },
      }),
    }
  },
})

export const { useGetAllPostsQuery, useGetCommentsForPostQuery, useGetPostsByUserIdQuery } =
  inctagramPublicPostsService

type RequestByComments = {
  params:
    | {
        pageNumber?: number
        pageSize?: number
        sortBy?: string
        sortDirection?: string
      }
    | undefined
  postId: number
}

type ResponseCommentsForPost = {
  items: {
    answerCount: number
    content: string
    createdAt: string
    from: {
      avatars: {
        createdAt: string
        fileSize: number
        height: number
        url: string
        width: number
      }[]
      id: number
      username: string
    }
    id: number
    isLiked: true
    likeCount: number
    postId: number
  }[]
  pageSize: number
  totalCount: number
}

type GetAllPostsType = {
  endCursorPostId?: number
  params?: { pageSize?: number; sortBy?: string; sortDirection?: string }
}
export type Post = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: {
    createdAt: string
    fileSize: number
    height: number
    uploadId: string
    url: string
    width: number
  }[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: {
    firstName: string
    lastName: string
  }
  ownerId: number
  updatedAt: string
  userName: string
}
export type ResponseAllPosts = {
  items: Post[]
  pageSize: number
  totalCount: number
  totalUsers: number
}
type ResponsePostsByUsedId = {
  items: Post[]
  pageSize: number
  totalCount: number
  totalUsers: number
}
type RequestToPostsByUserId = {
  endCursorPostId?: number
  params:
    | {
        pageSize?: number
        sortBy?: string
        sortDirection?: string
      }
    | undefined
  userId: number
}
