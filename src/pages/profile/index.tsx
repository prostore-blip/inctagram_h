import { GetNavLayout, HeadMeta, PageWrapper } from '@/components'
import { useGetUserProfileQuery } from '@/services/inctagram.profile.service'
import { useRouter } from 'next/router'

function UserProfileWrapper() {
  const router = useRouter()
  /**
   * запрос на сервер за профилем юзера
   */
  const { data, isLoading } = useGetUserProfileQuery()

  if (isLoading) {
    return (
      <PageWrapper>
        <h1>!!!!!!!!!!loading!!!!!!!!!</h1>
      </PageWrapper>
    )
  }
  void router.push(`/profile/${data?.id ?? 1}`)

  return null
}

UserProfileWrapper.getLayout = GetNavLayout
export default UserProfileWrapper
