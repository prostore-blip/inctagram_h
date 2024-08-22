import { GetLayout, HeadMeta, PageWrapper } from '@/components'
import { useTranslation } from '@/hooks/useTranslation'
import { ItemPost } from '@/pages/profile/itemPost'
import { useGetAllPostsQuery } from '@/services/inctagram.public-posts.service'
import { Typography } from '@chrizzo/ui-kit'
import { useRouter } from 'next/router'

import s from './posts.module.scss'

export function PublicPage() {
  /**
   * кастомный хук интернационализация
   */
  const { t } = useTranslation()
  /**
   * запрос за постами для публичной страницы. Доступно без авторизации
   */
  const { data, isLoading } = useGetAllPostsQuery(
    {
      endCursorPostId: undefined,
      params: { pageSize: 4 },
    },
    { pollingInterval: 60000 }
  )
  /**
   * хук обработки URL
   */
  const router = useRouter()
  /**
   * редирект на страницу юзера по его id
   * @param id - id профиля юзера
   */
  const navigateToPublicUserProfile = (id: number) => {
    void router.push(`/profile/${id}`)
  }

  //--------------  временный редирект на страницу пользователя--------------
  // useEffect(() => {
  //   console.log('useEffect from PubliPage')
  //
  //   void router.push('/profile')
  // }, [])
  //-------------------------------------------------------------------------
  /**
   * скелетон
   */
  if (isLoading) {
    return <div>...LOADING...</div>
  }
  /**
   * массив постов
   */
  const postsUsers = data?.items.map(p => {
    return (
      <ItemPost key={p.id} navigateToPublicUserProfile={navigateToPublicUserProfile} post={p} />
    )
  })

  return (
    <PageWrapper>
      <div className={s.overflowedContainer}>
        <div className={s.mainCntainer}>
          <HeadMeta title={'Inctagram'} />
          <div className={s.countUsersBlock}>
            <Typography variant={'h2'}>Registred users:</Typography>
            <Typography className={s.countUsers} variant={'h2'}>
              {data?.totalUsers}
            </Typography>
          </div>
          <ul className={s.postsWrapper}>{postsUsers}</ul>
        </div>
      </div>
    </PageWrapper>
  )
}

PublicPage.getLayout = GetLayout
export default PublicPage
