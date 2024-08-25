import { PageWrapper } from '@/components'
import { UserProfile } from '@/components/userProfile'
import { useAuthMeQuery } from '@/services/inctagram.auth.service'
import { useGetMyProfileQuery } from '@/services/inctagram.profile.service'
import { useGetPublicProfileForUserByIdQuery } from '@/services/inctagram.public-user.service'
import { useRouter } from 'next/router'

import s from './userProfilePage.module.scss'

function UserProfileDinamicPage() {
  const { data: authMe, isFetching: isFetchingAuthMe } = useAuthMeQuery()
  const router = useRouter()

  const { data: publicProfileUserData, isFetching: isFetchingPublicProfileUser } =
    useGetPublicProfileForUserByIdQuery(Number(router.query.id), {
      skip: isFetchingAuthMe,
    })

  const { data, isFetching } = useGetMyProfileQuery(undefined, {
    skip: isFetchingAuthMe || !authMe,
  })

  return (
    <PageWrapper>
      <div className={s.overflowedContainer}>
        <div className={s.mainCntainer}>
          {!isFetching && !isFetchingAuthMe && !isFetchingPublicProfileUser && (
            <UserProfile dataProfile={publicProfileUserData || data} myProfileId={authMe?.userId} />
          )}
        </div>
      </div>
    </PageWrapper>
  )
}

export default UserProfileDinamicPage
