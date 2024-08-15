import { inctagramService } from '@/services/inctagram.service'

export const inctagramPublicPostsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getAllPosts: builder.query<ResponseAllPosts, GetAllPostsType>({
        query: args => {
          return { params: args.params, url: `/v1/public-posts/all/${args.endCursorPostId}` }
        },
      }),
    }
  },
})

export const { useGetAllPostsQuery } = inctagramPublicPostsService

type GetAllPostsType = {
  endCursorPostId?: number
  params?: { pageSize?: number; sortBy?: string; sortDirection?: string }
}
type ResponseAllPosts = {
  items: [
    {
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
    },
  ]
  pageSize: number
  totalCount: number
  totalUsers: number
}
