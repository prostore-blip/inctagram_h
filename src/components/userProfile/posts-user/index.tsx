import React from 'react'

import ModalPost from '@/components/userProfile/posts-user/ModalPosts'
import { useGetPostsByUserIdQuery } from '@/services/incta-team-api/posts/posts-service'
import { useRouter } from 'next/router'

import s from '@/components/userProfile/userProfile.module.scss'

export const PostsUser = ({ userId, userName }: { userId: string; userName: string }) => {
  const router = useRouter()
  /**
   * запрос на сервер за постами юзера
   */
  const { data, isFetching } = useGetPostsByUserIdQuery({
    id: userId,
  })

  if (isFetching) {
    return <div>....LOADING...</div>
  }

  const users = data?.map((u: any) => {
    return (
      <li className={s.card} key={u.id} onClick={() => {}}>
        <div>
          <ModalPost post={u} showMore={false} userName={userName} />
        </div>
      </li>
    )
  })

  return <ul className={s.cardsBlock}>{users}</ul>
}
