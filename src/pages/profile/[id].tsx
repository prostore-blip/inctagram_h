import { ReactNode } from 'react'

import { BaseLayout } from '@/components/layouts/BaseLayout'
import { UserProfile } from '@/components/userProfile'
import { useGetUserProfileQuery } from '@/services/inctagram-work-api/inctagram.profile.service'
import { useRouter } from 'next/router'

import s from './userProfilePage.module.scss'

function UserProfileDinamicPage() {
  const router = useRouter()

  // const { data, isFetching } = useGetUserProfileQuery()

  return (
    <div className={s.overflowedContainer}>
      <div className={s.mainCntainer}>
        {/*{!isFetching && <UserProfile userName={data?.userName} />}*/}
        <UserProfile />
      </div>
    </div>
  )
}

UserProfileDinamicPage.getLayout = function getLayout(page: ReactNode) {
  return <BaseLayout>{page}</BaseLayout>
}

export default UserProfileDinamicPage
