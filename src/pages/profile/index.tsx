import { GetLayout, PageWrapper } from '@/components'
import { useGetUserProfileQuery } from '@/services/inctagram.profile.service'
import { useRouter } from 'next/router'

import s from './userProfilePage.module.scss'

function UserProfileWrapper() {
  const router = useRouter()

  /**
   * запрос на сервер за своим профилем юзера
   */
  const { data, isFetching } = useGetUserProfileQuery()

  console.log('UserprofileWrapper ', data, isFetching)
  if (isFetching) {
    console.log('UserprofileWrapper is Fetching')

    return (
      <PageWrapper>
        <h1 className={s.loader}>!!!!!!!!!!loading!!!!!!!!!</h1>
      </PageWrapper>
    )
  }
  if (data) {
    console.log('UserprofileWrapper is data true ', data)
    void router.push(`/profile/${data?.id}`)
  }
  console.log('UserprofileWrapper return null')

  return null
}

// UserProfileWrapper.getLayout = GetNavLayout
UserProfileWrapper.getLayout = GetLayout
export default UserProfileWrapper
