import React from 'react'

import ModalkaPost from '@/components/userProfile/getPostUser/modalPosts'
import { useGetPostsByUserIdQuery } from '@/services/incta-team-api/posts/posts-service'
import { useRouter } from 'next/router'

import s from '@/components/userProfile/userProfile.module.scss'

export const GetPostsUser = ({ userId, userName }: { userId: string; userName: string }) => {
  const router = useRouter()
  /**
   * запрос на сервер за постами юзера
   */
  const { data, isFetching } = useGetPostsByUserIdQuery({
    id: userId,
  })

  console.log('post', data)
  if (isFetching) {
    return <div>....LOADING...</div>
  }

  const users = data?.map((u: any) => {
    return (
      <li className={s.card} key={u.id} onClick={() => {}}>
        <div>
          <ModalkaPost post={u} showMore={false} userName={userName} />
        </div>
      </li>
    )
  })

  return <ul className={s.cardsBlock}>{users}</ul>
}
