import { useGetUserProfileQuery } from '@/services/inctagram.profile.service'
import { useRouter } from 'next/router'

export default function UserProfileWrapper() {
  const router = useRouter()
  /**
   * запрос на сервер за профилем юзера
   */
  const { data, isLoading } = useGetUserProfileQuery()

  if (isLoading) {
    return <h1>!!!!!!!!!!loading!!!!!!!!!</h1>
  }
  void router.push(`/userProfile/${data?.id ?? 1}`)

  return null
}

// UserProfileWrapper.getLayout = GetNavLayout
// export default UserProfileWrapper
