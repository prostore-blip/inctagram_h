import React from 'react'

import { useGetProfileUsersQuery } from '@/services/inctagram.followings.service'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from '@/components/userProfile/userProfile.module.scss'

import defaultAva from '../../../../public/defaultAva.jpg'

export const GetProfileUsers = () => {
  const router = useRouter()
  /**
   * запрос на сервер за профилями юзеров
   */
  const { data, isFetching } = useGetProfileUsersQuery()

  if (isFetching) {
    return <div>....LOADING...</div>
  }

  const redirectToUserProfile = (userName: string) => {
    alert('redirect to user profile')
  }
  const users = data?.items.map(u => {
    return (
      <li className={s.card} key={u.id} onClick={() => redirectToUserProfile(u.userName)}>
        <div>
          <Image
            alt={'avatar'}
            height={u?.avatars[0]?.height}
            src={u?.avatars[0]?.url ?? defaultAva}
            width={u?.avatars[0]?.width}
          />
        </div>
      </li>
    )
  })

  return <ul className={s.cardsBlock}>{users}</ul>
}
