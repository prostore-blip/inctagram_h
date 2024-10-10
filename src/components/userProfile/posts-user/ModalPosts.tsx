import React, { useState } from 'react'

import { Close } from '@/assets/icons/close'
import {
  Modal,
  ModalButtonCancel,
  ModalContent,
  ModalTitle,
  ModalTrigger,
} from '@/components/modal'
import { CarouselPost } from '@/components/userProfile/posts-user/CarouselPost'
import { PostComments } from '@/components/userProfile/posts-user/PostComments'
import { DateTimeFormatOptions } from '@/components/userProfile/posts-user/types'
import { Post, useGetCommentsQuery } from '@/services/incta-team-api/posts/posts-service'
import { Button, Card } from '@chrizzo/ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './posts.module.scss'

import defaultAva from '../../../../public/defaultAva.jpg'

type Props = {
  post: Post
  showMore: boolean
  userName: string
}

const ModalPost = ({ post, showMore, userName }: Props) => {
  /**
   * запрос за комментариями к посту
   */
  const { data } = useGetCommentsQuery()

  if (data) {
    localStorage.removeItem('postId')
  }

  /**
   * дата создания поста
   */
  //TODO необходимо в new Date пробрасывать дату создания поста с сервера,
  // но такие данные не предусмотрены бэкэндерами, поэтому хардкод
  const date = new Date('2024-09-25T11:02:57.570Z')
  const options: DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  const createdPostDate = date.toLocaleDateString('en-US', options)

  return (
    <Modal>
      <ModalTrigger asChild>
        <Image alt={'avatar'} height={228} src={defaultAva} width={234} />
      </ModalTrigger>
      <ModalContent
        aria-describedby={undefined}
        className={s.contentPost}
        onInteractOutside={event => {
          event.preventDefault()
        }}
      >
        <ModalTitle className={s.title}>
          <ModalButtonCancel asChild>
            <Button variant={'text'}>
              <Close />
            </Button>
          </ModalButtonCancel>
        </ModalTitle>
        <Card className={s.card} variant={'dark300'}>
          <CarouselPost image={post?.image} showMore={showMore} />
          <PostComments
            comments={data?.items}
            createdPostDate={createdPostDate}
            userName={userName}
          />
        </Card>
      </ModalContent>
    </Modal>
  )
}

export default ModalPost
