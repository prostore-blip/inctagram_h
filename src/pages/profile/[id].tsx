import { GetLayout, PageWrapper } from '@/components'
import { UserProfile } from '@/components/userProfile'
import { useGetUserProfileQuery } from '@/services/inctagram-work-api/inctagram.profile.service'
import { useRouter } from 'next/router'

import s from './userProfilePage.module.scss'

function UserProfileDinamicPage() {
  const router = useRouter()

  // const { data, isFetching } = useGetUserProfileQuery()

  return (
    <PageWrapper>
      <div className={s.overflowedContainer}>
        <div className={s.mainCntainer}>
          <UserProfile />
        </div>
      </div>
    </PageWrapper>
  )
}

// UserProfileDinamicPage.getLayout = GetNavLayout
// UserProfileDinamicPage.getLayout = GetLayout
export default UserProfileDinamicPage
