import { GetLayout, HeadMeta, PageWrapper } from '@/components'
import { useTranslation } from '@/hooks/useTranslation'
import { ItemPost } from '@/pages/profile/itemPost'
import {
  Post,
  ResponseAllPosts,
  useGetAllPostsQuery,
} from '@/services/inctagram.public-posts.service'
import { Typography } from '@chrizzo/ui-kit'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

import s from './posts.module.scss'

export const getStaticProps = (async context => {
  const res = await fetch('https://inctagram.work/api/v1/public-posts/all?pageSize=4')
  const dataPosts = await res.json()

  return { props: dataPosts }
}) satisfies GetStaticProps<{
  dataPosts: ResponseAllPosts
}>

export function PublicPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  /**
   * кастомный хук интернационализация
   */
  const { t } = useTranslation()
  /**
   * запрос за постами для публичной страницы. Доступно без авторизации
   */
  // const { data, isLoading } = useGetAllPostsQuery(
  //   {
  //     endCursorPostId: 0,
  //     params: { pageSize: 4 },
  //   },
  //   { pollingInterval: 60000, skip: true }
  // )
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

  /**
   * скелетон
   */
  // if (isLoading) {
  //   return <div>...LOADING...</div>
  // }
  /**
   * массив постов
   */
  const postsUsers = props?.pageProps?.items?.map((p: Post) => {
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
              {props?.totalUsers}
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
