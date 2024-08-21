import React, { useEffect, useState } from 'react'

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
import { Post, useGetCommentsForPostQuery } from '@/services/inctagram.public-posts.service'
import { Button, Card, Typography } from '@chrizzo/ui-kit'
import clsx from 'clsx'
import { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

import s from '@/pages/posts.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type Props = {
  index: number
  posts: Post[]
  showMore: boolean
}

const ModalkaPost = ({ index, posts, showMore }: Props) => {
  /**
   * хук useState для управления open/close AlertDialog.Root. Нужна только для skip'а запроса за
   * комментариями, если модалка не открыта. В компоненте Modalka можно не использовать
   */
  const [open, setOpen] = useState(false)

  const [postIndex, setPostIndex] = useState<number>(index)

  /**
   * запрос за комментариями к посту
   */
  const { data, isFetching } = useGetCommentsForPostQuery(
    {
      params: undefined,
      postId: posts[postIndex].id,
    },
    { skip: !open }
  )

  /**
   * хук из библиотеки карусели
   */
  const [emblaRef, emblaApi] = useEmblaCarousel()

  /**
   * кастомный хук для точек перехода к слайдам карусели
   */
  const { onDotButtonClick, scrollSnaps, selectedIndex } = useDotButton(emblaApi)

  /**
   * массив слайдов (картинки постов) карусели
   */
  const modalArrays = posts.map(item => {
    return (
      <div className={s.emblaSlide} key={item.id}>
        <Image
          alt={'image'}
          height={item.images[0].height}
          priority
          src={item.images[0].url || defaultAva}
          width={item.images[0].height}
        />
      </div>
    )
  })

  useEffect(() => {
    if (open) {
      console.log(index)
      emblaApi?.scrollTo(index, true)
    }
  }, [open])

  return (
    <Modalka onOpenChange={setOpen} open={open}>
      <ModalkaTrigger asChild>
        <div className={s.postImage} data-showMore={showMore}>
          <Image
            alt={'image'}
            height={posts[postIndex].images[0].height}
            priority
            src={posts[postIndex].images[0].url || defaultAva}
            width={posts[postIndex].images[0].height}
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
          <div className={s.postImageContent}>
            <div className={s.embla} ref={emblaRef}>
              <div className={s.emblaContainer}> {modalArrays}</div>
            </div>
            <Button
              className={s.prevModalButton}
              onClick={() => {
                emblaApi?.scrollPrev()
              }}
              type={'button'}
            >
              <PrevCarousel height={'48'} width={'48'} />
            </Button>
            <Button
              className={s.nextModalButton}
              onClick={() => {
                emblaApi?.scrollNext()
                const selectedPostIndex = emblaApi?.selectedScrollSnap()

                if (selectedPostIndex) {
                  setPostIndex(selectedPostIndex)
                }
              }}
              type={'button'}
            >
              <NextCarousel height={'48'} width={'48'} />
            </Button>
            <div className={s.dotes}>
              {scrollSnaps.map((_, index) => (
                <div
                  className={clsx(s.dote, index === selectedIndex && s.activeDot)}
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                ></div>
              ))}
            </div>
          </div>
          <div className={s.commentsWr}>
            <div className={s.avaUserNameBlock}>
              <Image
                alt={'ava'}
                height={36}
                src={posts[postIndex].avatarOwner || defaultAva}
                width={36}
              />
              <Typography variant={'h3'}>{posts[postIndex].userName}</Typography>
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
                            {c.from.username}{' '}
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
                {posts[postIndex].likesCount}{' '}
                <Typography as={'span'} variant={'regularBold14'}>
                  &quot;Like&quot;
                </Typography>
              </Typography>
              <Typography className={s.date} variant={'small'}>
                {posts[postIndex].createdAt}
              </Typography>
            </div>
          </div>
        </Card>
      </ModalkaContent>
    </Modalka>
  )
}

export default ModalkaPost
