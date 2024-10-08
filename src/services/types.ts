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
export type CurrentSession = {
  browserName: string
  browserVersion: string
  deviceId: number
  ip: string
  lastActive: string
  osName: string
  osVersion: string
}

export type ResponseAllSessionsType = {
  current: CurrentSession
  others: CurrentSession[]
}

type CurrentSubscriptionType = {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}

export type ResponseCurrentSubscriptionType = {
  data: CurrentSubscriptionType[]
  hasAutoRenewal: boolean
}

type AllSubscriptionsType = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: string
  price: number
  subscriptionId: string
  subscriptionType: string
  userId: number
}

export type ResponseAllSubscriptionsType = AllSubscriptionsType[]
