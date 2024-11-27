import React from 'react'

import { PostComment } from '@/components/userProfile/posts-user/PostComment'
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
        {comments?.map(c => {
          return <PostComment comment={c} key={c.id} />
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
