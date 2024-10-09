import { ReactNode } from 'react'

import { BaseLayout } from '@/components/layouts/BaseLayout'
import { useGetUserProfileQuery } from '@/services/inctagram-work-api/inctagram.profile.service'
import { useRouter } from 'next/router'

import s from './userProfilePage.module.scss'

function UserProfileWrapper() {
  const router = useRouter()

  /**
   * запрос на сервер за своим профилем юзера
   */
  const { data, isFetching } = useGetUserProfileQuery()

  if (isFetching) {
    return <h1 className={s.loader}>!!!!!!!!!!loading!!!!!!!!!</h1>
  }
  if (data) {
    void router.push(`/profile/${data?.id}`)
  }

  return null
}

UserProfileWrapper.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>
}

export default UserProfileWrapper
