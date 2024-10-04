import { HeadMeta, PageWrapper } from '@/components'
import { ItemPost } from '@/components/posts/itemPost'
import { useTranslation } from '@/hooks/useTranslation'
import { Post, ResponseAllPosts } from '@/services/inctagram.public-posts.service'
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
   * хук обработки URL
   */
  const router = useRouter()
  /**
   * редирект на страницу юзера по его id
   * @param postId - id поста, который нужно открыть
   * @param id - id профиля юзера
   * 1) если postId есть, то добавляем его в url в качестве query-параметра и переходим на стрицу юзера. И там по
   * этому postId открываем модалку поста
   * 2) если postId нет, то просто переходим на страницу юзера
   */
  const navigateToPublicUserProfile = (postId: number | undefined, id: number) => {
    if (postId) {
      void router.push({
        pathname: `/profile/${id}`,
        query: { postId },
      })
    } else {
      void router.push(`/profile/${id}`)
    }
  }
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
              {props?.pageProps?.totalUsers}
            </Typography>
          </div>
          <ul className={s.postsWrapper}>{postsUsers}</ul>
        </div>
      </div>
    </PageWrapper>
  )
}

export default PublicPage
