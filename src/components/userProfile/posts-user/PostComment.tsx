import React from 'react'
import ReactTimeAgo from 'react-time-ago'

import { Comment } from '@/services/incta-team-api/posts/posts-service'
import { Typography } from '@chrizzo/ui-kit'

import s from '@/components/userProfile/posts-user/posts.module.scss'

import defaultAva from '../../../../public/defaultAva.jpg'

type Props = {
  comment: Comment
}
export const PostComment = ({ comment }: Props) => {
  /**
   * дата создания комментария
   */
  const dateAgo = new Date(comment.createdAt)

  return (
    <li className={s.commentWr}>
      <img alt={'ava'} height={36} src={defaultAva.src} width={36} />
      <div className={s.commentBlock}>
        <Typography as={'span'} variant={'regular14'}>
          <Typography as={'span'} variant={'regularBold14'}>
            {comment.from.username}
          </Typography>
          {comment.content}
        </Typography>
        <Typography className={s.date} variant={'small'}>
          <ReactTimeAgo date={dateAgo} />
        </Typography>
      </div>
    </li>
  )
}
