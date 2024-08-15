import { GetLayout, HeadMeta, PageWrapper } from '@/components'
import { useTranslation } from '@/hooks/useTranslation'
import { useGetAllPostsQuery } from '@/services/inctagram.public-posts.service'
import { Button, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './posts.module.scss'

import defaultAva from '../../public/defaultAva.jpg'

export function PublicPage() {
  const { t } = useTranslation()
  const { data, isFetching } = useGetAllPostsQuery({
    endCursorPostId: undefined,
    params: { pageSize: 4 },
  })
  const router = useRouter()

  //--------------  временный редирект на страницу пользователя--------------
  // useEffect(() => {
  //   console.log('useEffect from PubliPage')
  //
  //   void router.push('/profile')
  // }, [])
  //-------------------------------------------------------------------------
  if (isFetching) {
    return <div>...LOADING...</div>
  }
  const postsUsers = data?.items.map(p => {
    return (
      <li className={s.post} key={p.id}>
        <div className={s.postImage}>
          <Image alt={'image'} priority src={defaultAva} />
        </div>
        <div className={s.avaUserNameBlock}>
          <Image alt={'ava'} height={20} src={p.avatarOwner} width={20} />
          <Typography variant={'h3'}>{p.userName}</Typography>
        </div>
        <Typography className={s.date} variant={'small'}>
          {' '}
          {p.createdAt}
        </Typography>
        <Typography className={s.description} variant={'regular14'}>
          {p.description ||
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, deleniti? Lorem ipsum dolor sit amet, ' +
              'consectetur adipisicing elit. Alias, cumque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, veritatis.'}
        </Typography>
        <Typography variant={'regularLink'}>Show more</Typography>
      </li>
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
