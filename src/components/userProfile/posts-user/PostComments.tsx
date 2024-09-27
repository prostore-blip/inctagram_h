import React from 'react'
import ReactTimeAgo from 'react-time-ago'

import { Comment } from '@/services/incta-team-api/posts/posts-service'
import { Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'

import s from '@/components/userProfile/posts-user/posts.module.scss'

import defaultAva from '../../../../public/defaultAva.jpg'

type Props = {
  comments: Comment[] | undefined
  createdPostDate: string
  userName: string
}
export const PostComments = ({ comments = [], createdPostDate, userName }: Props) => {
  return (
    <div className={s.commentsWr}>
      <div className={s.avaUserNameBlock}>
        <Image alt={'ava'} height={36} src={defaultAva} width={36} />
        <Typography variant={'h3'}>{userName}</Typography>
      </div>
      <hr className={s.hr} />
      <ul className={s.commentsUl}>
        {comments?.map((c: any) => {
          /**
           * дата создания комментария
           */
          const dateAgo = new Date(c.createdAt)

          return (
            <li className={s.commentWr} key={c.id}>
              <img alt={'ava'} height={36} src={defaultAva.src} width={36} />
              <div className={s.commentBlock}>
                <Typography as={'span'} variant={'regular14'}>
                  <Typography as={'span'} variant={'regularBold14'}>
                    {c.from.username}{' '}
                  </Typography>
                  {c.content}
                </Typography>
                <Typography className={s.date} variant={'small'}>
                  <ReactTimeAgo date={dateAgo} />
                  {/*{c.createdAt}*/}
                </Typography>
              </div>
            </li>
          )
        })}
      </ul>
      <hr className={s.hr} />
      <div className={s.likesBlock}>
        <div className={s.avatarsLiked}></div>
        <Typography as={'span'} variant={'regular14'}>
          900
          <Typography as={'span'} variant={'regularBold14'}>
            &quot;Like&quot;
          </Typography>
        </Typography>
        <Typography className={s.date} variant={'small'}>
          {createdPostDate}
        </Typography>
      </div>
    </div>
  )
}
