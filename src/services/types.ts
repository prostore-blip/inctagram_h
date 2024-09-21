type UploadId = {
  uploadId: string
}
export type RequestCreatePost = {
  childrenMetadata: UploadId[]
  description: string | undefined
}
type AvatarsType = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
type OwnerPostType = {
  firstName: string
  lastName: string
}
export type ResponseCreatePost = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: AvatarsType[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: OwnerPostType
  ownerId: number
  updatedAt: string
  userName: string
}
type ImagesPostType = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export type ResponseCreateImagesPost = {
  images: ImagesPostType[]
}
