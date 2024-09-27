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
  const router = useRouter()
  const queryParams = router.query

  /**
   * хук useState для управления open/close AlertDialog.Root. Нужна только для skip'а запроса за
   * комментариями, если модалка не открыта. В компоненте Modalka можно не использовать
   */
  const [open, setOpen] = useState(false)

  /**
   * запрос за комментариями к посту
   */
  const { data, isFetching } = useGetCommentsQuery()

  if (data) {
    localStorage.removeItem('postId')
  }

  /**
   * дата создания поста
   */
  // const date = new Date(post.createdAt)
  const date = new Date('2024-09-25T11:02:57.570Z')
  const options: DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  const createdPostDate = date.toLocaleDateString('en-US', options)

  /**
   * добавляем query-параметры в url. А именно id открытого поста. Это нужно, чтобы, когды мы открыли модалку
   * поста, в url появился id этого поста. Далее мы можем скопировать url и переслать другу. Он перейдёт
   * по нашей ссылке и у него откроется модалка поста автоматически. Без id в url при переходе по ссылку,
   * как понять, модалку какого поста открыть, ведь подгрузитсястраница пользователя с несколькими постами?
   * При закрытии модалки, убираем query-параметры.
   */
  // useEffect(() => {
  //   if (open && !queryParams.postId) {
  //     router.replace({
  //       pathname: router.asPath,
  //       query: { postId: post.id },
  //     })
  //   }
  //   if (!open && Number(queryParams.postId) === post.id) {
  //     router.replace({
  //       pathname: `${post.ownerId}`,
  //     })
  //   }
  // }, [open])

  return (
    <Modal onOpenChange={setOpen} open={open}>
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
