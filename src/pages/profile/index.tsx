import { GetLayout, PageWrapper } from '@/components'
import { useAuthMeQuery } from '@/services/inctagram.auth.service'
import { useRouter } from 'next/router'

import s from './userProfilePage.module.scss'

function UserProfileWrapper() {
  /**
   * Обработка URL
   */
  const router = useRouter()

  /**
   * authMe запрос для вытягивания моего id
   */
  const { data, isFetching } = useAuthMeQuery()

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
    void router.push(`/profile/${data?.userId}`)
  }

  return null
}

export default UserProfileWrapper
