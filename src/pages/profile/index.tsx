import { GetLayout, GetNavLayout, HeadMeta, PageWrapper } from '@/components'
import { LoginNavigate } from '@/hoc/LoginNavigate'
import {
  useGetUserProfileByUserIdQuery,
  useGetUserProfileQuery,
} from '@/services/inctagram.profile.service'
import { useRouter } from 'next/router'

import s from './userProfilePage.module.scss'

function UserProfileWrapper() {
  const router = useRouter()

  /**
   * запрос на сервер за профилем юзера
   */
  const { data, isFetching } = useGetUserProfileQuery()

  /**
   * запрос на сервер за профилем юзера по имени, чтобы забрать число followers
   */
  const {} = useGetUserProfileByUserIdQuery(data?.userName ?? '', { skip: !data || isFetching })

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
    void router.push(`/profile/${data?.id ?? 1}`)
  }
  console.log('UserprofileWrapper return null')

  return null
}

// UserProfileWrapper.getLayout = GetNavLayout
UserProfileWrapper.getLayout = GetLayout
export default UserProfileWrapper
