import React, { useState } from 'react'

import { Close } from '@/assets/icons/close'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTitle,
  ModalkaTrigger,
} from '@/components/modal'
import {
  Post,
  useGetCommentsForPostQuery,
  useGetPostsByUserIdQuery,
} from '@/services/inctagram.public-posts.service'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'

import s from '@/pages/posts.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type Props = {
  post: Post
  showMore: boolean
}

const ModalkaPost = ({ post: p, showMore }: Props) => {
  /**
   * хук useState для управления open/close AlertDialog.Root. Нужен для того,
   * чтобы модалка закрывалась после передачи на сервер данных из формы,
   * иначе она просто закрывается и данные не передаются
   */
  const [open, setOpen] = useState(false)

  const [idPost, setIdPostn] = useState<number>(p.id)

  /**
   * запрос за комментариями к посту
   */
  const { data, isFetching } = useGetCommentsForPostQuery(
    {
      params: undefined,
      postId: idPost,
    },
    { skip: !open }
  )

  return (
    <Modalka onOpenChange={setOpen} open={open}>
      <ModalkaTrigger asChild>
        <div className={s.postImage} data-showMore={showMore}>
          <Image
            alt={'image'}
            height={p.images[0].height}
            priority
            src={p.images[0].url || defaultAva}
            width={p.images[0].height}
          />
        </div>
      </ModalkaTrigger>
      <ModalkaContent aria-describedby={'open modal comments to post'} className={s.contentPost}>
        <ModalkaTitle className={s.title}>
          <ModalkaButtonCancel asChild>
            <Button variant={'text'}>
              <Close />
            </Button>
          </ModalkaButtonCancel>
        </ModalkaTitle>
        <Card className={s.card} variant={'dark300'}>
          <div className={s.postImageContent} data-showMore={showMore}>
            <Image
              alt={'image'}
              height={p.images[0].height}
              priority
              src={p.images[0].url || defaultAva}
              width={p.images[0].height}
            />
          </div>
          <div className={s.commentsWr}>
            <div className={s.avaUserNameBlock}>
              <Image alt={'ava'} height={36} src={p.avatarOwner || defaultAva} width={36} />
              <Typography variant={'h3'}>{p.userName}</Typography>
            </div>
            <hr className={s.hr} />
            <ul className={s.commentsUl}>
              {isFetching ? (
                <>...Loading.....</>
              ) : (
                data?.items.map(c => {
                  return (
                    <li className={s.commentWr} key={c.id}>
                      <Image
                        alt={'ava'}
                        height={36}
                        src={c.from.avatars[1].url || defaultAva}
                        width={36}
                      />
                      <div className={s.commentBlock}>
                        <Typography as={'span'} variant={'regular14'}>
                          <Typography as={'span'} variant={'regularBold14'}>
                            {c.from.username}
                          </Typography>
                          {c.content}
                        </Typography>
                        <Typography className={s.date} variant={'small'}>
                          {c.createdAt}
                        </Typography>
                      </div>
                    </li>
                  )
                })
              )}
            </ul>
            <hr className={s.hr} />
            <div className={s.likesBlock}>
              <div className={s.avatarsLiked}></div>
              <Typography as={'span'} variant={'regular14'}>
                {p.likesCount}{' '}
                <Typography as={'span'} variant={'regularBold14'}>
                  &quot;Like&quot;
                </Typography>
              </Typography>
              <Typography className={s.date} variant={'small'}>
                {p.createdAt}
              </Typography>
            </div>
          </div>
        </Card>
      </ModalkaContent>
    </Modalka>
  )
}

export default ModalkaPost
