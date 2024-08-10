import { GetNavLayout, HeadMeta, PageWrapper } from '@/components'
import { LoginNavigate } from '@/hoc/LoginNavigate'
import { useGetUserProfileQuery } from '@/services/inctagram.profile.service'
import { useRouter } from 'next/router'

function UserProfileWrapper() {
  const router = useRouter()

  /**
   * запрос на сервер за профилем юзера
   */
  const { data, isFetching } = useGetUserProfileQuery()

  console.log('UserprofileWrapper ', data, isFetching)
  if (isFetching) {
    console.log('UserprofileWrapper is Fetching')

    return (
      <PageWrapper>
        <h1>!!!!!!!!!!loading!!!!!!!!!</h1>
      </PageWrapper>
    )
  }
  if (data) {
    console.log('UserprofileWrapper is data true ', data)
    void router.push(`/profile/${data?.id ?? 1}`)
  }
  console.log('UserprofileWrapper return null')

  return null
}

UserProfileWrapper.getLayout = GetNavLayout
export default UserProfileWrapper
