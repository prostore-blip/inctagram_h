import React from 'react'

import ModalkaPost from '@/components/posts/modalkaPost'
import { useGetPostsByUserIdQuery } from '@/services/inctagram.public-posts.service'
import { useRouter } from 'next/router'

import s from '@/components/userProfile/userProfile.module.scss'

export const GetPostsUser = () => {
  const router = useRouter()
  /**
   * запрос на сервер за постами юзера
   */
  const { data, isFetching } = useGetPostsByUserIdQuery({
    params: undefined,
    userId: Number(router.query.id),
  })

  if (isFetching) {
    return <div>....LOADING...</div>
  }

  const users = data?.items.map(u => {
    return (
      <li className={s.card} key={u.id} onClick={() => {}}>
        <div>
          <ModalkaPost post={u} showMore={false} />
        </div>
      </li>
    )
  })

  return <ul className={s.cardsBlock}>{users}</ul>
}
