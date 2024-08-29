import React, { useState } from 'react'
import ReactTimeAgo from 'react-time-ago'

import { NextCarousel, PrevCarousel } from '@/assets/icons'
import { Close } from '@/assets/icons/close'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTitle,
  ModalkaTrigger,
} from '@/components/modal'
import { useDotButton } from '@/hooks/useDotCarouselButton'
import { DateTimeFormatOptions } from '@/pages/profile/types'
import { Post, useGetCommentsForPostQuery } from '@/services/inctagram.public-posts.service'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

import s from '@/pages/posts.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type Props = {
  openModal: boolean
  post: Post
  showMore: boolean
}

const ModalkaPost = ({ openModal = false, post, showMore }: Props) => {
  /**
   * хук useState для управления open/close AlertDialog.Root. Нужна только для skip'а запроса за
   * комментариями, если модалка не открыта. В компоненте Modalka можно не использовать
   */

  const [open, setOpen] = useState(openModal)

  /**
   * запрос за комментариями к посту
   */
  const { data, isFetching } = useGetCommentsForPostQuery(
    {
      params: undefined,
      postId: post.id,
    },
    { skip: !open }
  )

  if (data) {
    localStorage.removeItem('postId')
  }

  /**
   * хук из библиотеки карусели для контента модалки (там, где большое изображение нужно прокручивать)
   */
  const [emblaRefBig, emblaApiBig] = useEmblaCarousel()

  /**
   * кастомный хук для точек перехода к слайдам карусели для контента модалки  (там, где большое
   * изображение нужно прокручивать)
   */
  const {
    onDotButtonClick: onDotButtonClickBig,
    scrollSnaps: scrollSnapsBig,
    selectedIndex: selectedIndexBig,
  } = useDotButton(emblaApiBig)

  /**
   * массив images поста для карусели
   */
  const imagesPostArray = post?.images.map(image => {
    return (
      <div className={s.emblaSlide} key={image.uploadId}>
        <div className={s.postImage} data-showmore={showMore}>
          <Image
            alt={'image'}
            height={image?.height}
            priority
            src={image?.url || defaultAva}
            width={image?.width}
          />
        </div>
      </div>
    )
  })

  /**
   * дата создания поста
   */
  const date = new Date(post.createdAt)
  const options: DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)

  return (
    <Modalka onOpenChange={setOpen} open={open}>
      <ModalkaTrigger asChild>
        <Image
          alt={'avatar'}
          height={post?.images[0]?.height}
          src={post?.images[0]?.url ?? defaultAva}
          width={post?.images[0]?.width}
        />
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
          <div className={s.postImageContent}>
            <div className={s.embla} ref={emblaRefBig}>
              <div className={s.emblaContainer}> {imagesPostArray}</div>
            </div>
            <Button
              className={s.prevModalButton}
              onClick={() => {
                emblaApiBig?.scrollPrev()
              }}
              type={'button'}
            >
              <PrevCarousel height={'48'} width={'48'} />
            </Button>
            <Button
              className={s.nextModalButton}
              onClick={() => {
                emblaApiBig?.scrollNext()
              }}
              type={'button'}
            >
              <NextCarousel height={'48'} width={'48'} />
            </Button>
            <div className={s.dotes}>
              {scrollSnapsBig.map((_, index) => (
                <div
                  className={clsx(s.dote, index === selectedIndexBig && s.activeDot)}
                  key={index}
                  onClick={() => onDotButtonClickBig(index)}
                ></div>
              ))}
            </div>
          </div>
          <div className={s.commentsWr}>
            <div className={s.avaUserNameBlock}>
              <Image alt={'ava'} height={36} src={post.avatarOwner || defaultAva} width={36} />
              <Typography variant={'h3'}>{post.userName}</Typography>
            </div>
            <hr className={s.hr} />
            <ul className={s.commentsUl}>
              {isFetching ? (
                <>...Loading.....</>
              ) : (
                data?.items.map(c => {
                  /**
                   * дата создания комментария
                   */
                  const dateAgo = new Date(c.createdAt)

                  return (
                    <li className={s.commentWr} key={c.id}>
                      <Image
                        alt={'ava'}
                        height={36}
                        src={c.from?.avatars[1]?.url || defaultAva}
                        width={36}
                      />
                      <div className={s.commentBlock}>
                        <Typography as={'span'} variant={'regular14'}>
                          <Typography as={'span'} variant={'regularBold14'}>
                            {c.from.username}{' '}
                          </Typography>
                          {c.content}
                        </Typography>
                        <Typography className={s.date} variant={'small'}>
                          <ReactTimeAgo date={dateAgo} />
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
                {post.likesCount}{' '}
                <Typography as={'span'} variant={'regularBold14'}>
                  &quot;Like&quot;
                </Typography>
              </Typography>
              <Typography className={s.date} variant={'small'}>
                {formattedDate}
              </Typography>
            </div>
          </div>
        </Card>
      </ModalkaContent>
    </Modalka>
  )
}

export default ModalkaPost
