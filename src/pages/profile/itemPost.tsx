import { useState } from 'react'

import ModalkaPost from '@/pages/profile/modalkaPost'
import { Post } from '@/services/inctagram.public-posts.service'
import { Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'

import s from '@/pages/posts.module.scss'

type Props = {
  navigateToPublicUserProfile: (id: number) => void
  post: Post
}

export const ItemPost = ({ navigateToPublicUserProfile, post: p }: Props) => {
  /**
   * стейт раскрытия описания под фото
   */
  const [showMore, setShowMore] = useState(false)
  /**
   * раскрыть/скрыть описание под фото
   */
  const expandDescription = () => {
    setShowMore(n => !n)
  }

  return (
    <li className={s.post}>
      <ModalkaPost post={p} showMore={showMore} />
      <div className={s.avaUserNameBlock} onClick={() => navigateToPublicUserProfile(p.ownerId)}>
        <Image alt={'ava'} height={36} src={p.avatarOwner} width={36} />
        <Typography variant={'h3'}>{p.userName}</Typography>
      </div>
      <Typography className={s.date} variant={'small'}>
        {' '}
        {p.createdAt}
      </Typography>
      <Typography className={s.description} data-showMore={showMore} variant={'regular14'}>
        {p.description ||
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, deleniti? Lorem ipsum dolor sit amet, ' +
            'consectetur adipisicing elit. Alias, cumque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, veritatis.'}
      </Typography>
      <Typography
        as={'span'}
        className={s.showMore}
        onClick={expandDescription}
        variant={'regularLink'}
      >
        {showMore ? 'Hide' : 'Show more'}
      </Typography>
    </li>
  )
}
