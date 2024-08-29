import { HeadMeta, PageWrapper } from '@/components'
import { useTranslation } from '@/hooks/useTranslation'
import { ItemPost } from '@/pages/profile/itemPost'
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
   */
  const navigateToPublicUserProfile = (postId: number | undefined, id: number) => {
    if (postId) {
      localStorage.setItem('postId', JSON.stringify(postId))
    }

    void router.push(`/profile/${id}`)
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
              {props?.totalUsers}
            </Typography>
          </div>
          <ul className={s.postsWrapper}>{postsUsers}</ul>
        </div>
      </div>
    </PageWrapper>
  )
}

export default PublicPage
