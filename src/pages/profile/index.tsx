import { GetLayout, PageWrapper } from '@/components'
import { useGetMyProfileQuery } from '@/services/inctagram.profile.service'
import { useRouter } from 'next/router'

import s from './userProfilePage.module.scss'

function UserProfileWrapper() {
  /**
   * Обработка URL
   */
  const router = useRouter()

  /**
   * запрос на сервер за своим профилем юзера
   */
  const { data, isFetching } = useGetMyProfileQuery()

  /**
   * Скелетон
   */
  if (isFetching) {
    return (
      <PageWrapper>
        <h1 className={s.loader}>!!!!!!!!!!loading!!!!!!!!!</h1>
      </PageWrapper>
    )
  }
  /**
   * Если залогинен, то редирект на свою страницу
   */
  if (data) {
    void router.push(`/profile/${data?.id}`)
  }

  return null
}

UserProfileWrapper.getLayout = GetLayout
export default UserProfileWrapper
