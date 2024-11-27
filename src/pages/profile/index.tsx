import { ReactNode } from 'react'

import { BaseLayout } from '@/components/layouts/BaseLayout'
import Spinner from '@/components/uikit-temp-replacement/spinner/Spinner'
import { useGetMyProfileQuery } from '@/services/incta-team-api/profile/profile-service'
import { useGetUserProfileQuery } from '@/services/inctagram-work-api/inctagram.profile.service'
import { useRouter } from 'next/router'

import s from './userProfilePage.module.scss'

function UserProfileWrapper() {
  const router = useRouter()

  /**
   * запрос на сервер за своим профилем юзера
   */
  const { data, error, isFetching } = useGetMyProfileQuery()

  if (isFetching) {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          minHeight: '90vh',
        }}
      >
        <Spinner active size={300} />
      </div>
    )
  }
  if (data) {
    void router.push(`/profile/${data?.id}`)
  }
  if (error) {
    void router.push(`/profile/create`)
  }

  return null
}

UserProfileWrapper.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>
}

export default UserProfileWrapper
