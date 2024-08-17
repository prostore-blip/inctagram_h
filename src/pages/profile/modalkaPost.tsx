import React, { useState } from 'react'

import { Close } from '@/assets/icons/close'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTitle,
  ModalkaTrigger,
} from '@/components/modal'
import { useGetCommentsForPostQuery } from '@/services/inctagram.public-posts.service'
import { Button, Card, TextField, Typography } from '@chrizzo/ui-kit'
import Image from 'next/image'

import s from '@/pages/posts.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

const ModalkaPost = ({ post: p, showMore }: any) => {
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
      <ModalkaContent aria-describedby={'open viewport followers'} className={s.content}>
        <ModalkaTitle className={s.title}>
          <ModalkaButtonCancel asChild>
            <Button className={s.close} variant={'text'}>
              <Close />
            </Button>
          </ModalkaButtonCancel>
        </ModalkaTitle>
        <Card className={s.card} maxWidth={'644px'} variant={'dark300'}>
          <div className={s.postImageContent} data-showMore={showMore}>
            <Image
              alt={'image'}
              height={p.images[0].height}
              priority
              src={p.images[0].url || defaultAva}
              width={p.images[0].height}
            />
          </div>
          <ul>
            {isFetching ? (
              <>...Loading.....</>
            ) : (
              data?.items.map(c => {
                return (
                  <li key={c.id}>
                    {c.from.username}
                    {c.content}
                  </li>
                )
              })
            )}
          </ul>
        </Card>
      </ModalkaContent>
    </Modalka>
  )
}

export default ModalkaPost
