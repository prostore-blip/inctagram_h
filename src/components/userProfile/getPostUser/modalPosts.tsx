import React, { useEffect, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'

import { Close } from '@/assets/icons/close'
import { NextCarousel } from '@/assets/icons/nextCarousel'
import { PrevCarousel } from '@/assets/icons/prevCarousel'
import {
  Modalka,
  ModalkaButtonCancel,
  ModalkaContent,
  ModalkaTitle,
  ModalkaTrigger,
} from '@/components/modal'
import { DateTimeFormatOptions } from '@/components/userProfile/getPostUser/types'
import { useDotButton } from '@/hooks/useDotCarousel'
import { Post, useGetCommentsQuery } from '@/services/incta-team-api/posts/posts-service'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './posts.module.scss'

import defaultAva from '../../../../public/defaultAva.jpg'

type Props = {
  post: Post
  showMore: boolean
  userName: string
}

const ModalkaPost = ({ post, showMore, userName }: Props) => {
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
  const imagesPostArray = Array(4)
    .fill(post?.image)
    .map(image => {
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
  // const date = new Date(post.createdAt)
  const date = new Date('2024-09-25T11:02:57.570Z')
  const options: DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)

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
    <Modalka onOpenChange={setOpen} open={open}>
      <ModalkaTrigger asChild>
        <Image alt={'avatar'} height={228} src={defaultAva} width={234} />
      </ModalkaTrigger>
      <ModalkaContent aria-describedby={undefined} className={s.contentPost}>
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
              <Image alt={'ava'} height={36} src={defaultAva} width={36} />
              <Typography variant={'h3'}>{userName}</Typography>
            </div>
            <hr className={s.hr} />
            <ul className={s.commentsUl}>
              {data?.items.map((c: any) => {
                /**
                 * дата создания комментария
                 */
                const dateAgo = new Date(c.createdAt)

                return (
                  <li className={s.commentWr} key={c.id}>
                    <img alt={'ava'} height={36} src={defaultAva.src} width={36} />
                    <div className={s.commentBlock}>
                      <Typography as={'span'} variant={'regular14'}>
                        <Typography as={'span'} variant={'regularBold14'}>
                          {c.from.username}{' '}
                        </Typography>
                        {c.content}
                      </Typography>
                      <Typography className={s.date} variant={'small'}>
                        {/*<ReactTimeAgo date={dateAgo} />*/}
                        {c.createdAt}
                      </Typography>
                    </div>
                  </li>
                )
              })}
            </ul>
            <hr className={s.hr} />
            <div className={s.likesBlock}>
              <div className={s.avatarsLiked}></div>
              <Typography as={'span'} variant={'regular14'}>
                900
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
