export type SearchInputValueType = {
  search: string
  textFromDebounceInput: string
}
type AvatarFollowingUser = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
export type UsersQueryParamsType = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
}
export type RequestForFollowersUsers = {
  params?: UsersQueryParamsType
  username?: string
}
export type RequestType<T> = {
  items: T[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

type CommonItemType = {
  avatars: AvatarFollowingUser[]
  createdAt: string
  id: number
  userName: string
}

export interface FollowersUsersType extends CommonItemType {
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
}

export interface UsersType extends CommonItemType {
  firstname: string
  lastname: string
}
