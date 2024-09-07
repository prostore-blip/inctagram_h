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

  if (isFetching) {
    return (
      <PageWrapper>
        <h1 className={s.loader}>!!!!!!!!!!loading!!!!!!!!!</h1>
      </PageWrapper>
    )
  }
  if (data) {
    void router.push(`/profile/${data?.id}`)
  }

  return null
}

// UserProfileWrapper.getLayout = GetNavLayout
UserProfileWrapper.getLayout = GetLayout
export default UserProfileWrapper
