type AvatarsType = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type ResponseDataUserProfile = {
  aboutMe: string
  avatars: AvatarsType[]
  city: string
  country: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  region: string
  userName: string
}

export type ResponseDataUserProfileByUserName = {
  aboutMe: string
  avatars: AvatarsType[]
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  followersCount: number
  followingCount: number
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  lastName: string
  publicationsCount: number
  region: string
  userName: string
}
