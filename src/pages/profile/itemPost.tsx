import React, { useState } from 'react'
import ReactTimeAgo from 'react-time-ago'

import { NextCarousel, PrevCarousel } from '@/assets/icons'
import { useDotButton } from '@/hooks/useDotCarouselButton'
import { Post } from '@/services/inctagram.public-posts.service'
import { Button, Typography } from '@chrizzo/ui-kit'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'

import s from '@/pages/posts.module.scss'

import defaultAva from '../../../public/defaultAva.jpg'

type Props = {
  navigateToPublicUserProfile: (postId: number | undefined, id: number) => void
  post: Post
}

export const ItemPost = ({ navigateToPublicUserProfile, post: p }: Props) => {
  /**
   * стейт раскрытия описания под фото
   */
  const [showMore, setShowMore] = useState(false)
  /**
   * хук из библиотеки карусели для триггера модалки
   */
  const [emblaRef, emblaApi] = useEmblaCarousel()

  /**
   * кастомный хук для точек перехода к слайдам карусели для триггера модалки
   */
  const { onDotButtonClick, scrollSnaps, selectedIndex } = useDotButton(emblaApi)

  /**
   * раскрыть/скрыть описание под фото
   */
  const expandDescription = () => {
    setShowMore(n => !n)
  }
  /**
   * дата создания поста
   */
  const dateAgo = new Date(p.createdAt)

  /**
   * массив images поста для карусели
   */
  const imagesPostArray = p?.images.map(image => {
    return (
      <div className={s.emblaSlide} key={image.uploadId}>
        <div
          className={s.postImage}
          data-showmore={showMore}
          onClick={() => navigateToPublicUserProfile(p.id, p.ownerId)}
        >
          <img
            alt={'image'}
            height={image?.height}
            src={image?.url ?? defaultAva}
            width={image?.width}
          />
        </div>
      </div>
    )
  })

  return (
    <li className={s.post}>
      <div className={s.modalWr}>
        <div className={s.embla} ref={emblaRef}>
          <div className={s.emblaContainer}>{imagesPostArray}</div>
        </div>
        {!showMore && (
          <>
            <Button
              className={s.prevButton}
              onClick={() => {
                emblaApi?.scrollPrev()
              }}
              type={'button'}
            >
              <PrevCarousel />
            </Button>
            <Button
              className={s.nextButton}
              onClick={() => {
                emblaApi?.scrollNext()
              }}
              type={'button'}
            >
              <NextCarousel />
            </Button>
            <div className={s.dots}>
              {scrollSnaps.map((_, index) => (
                <div
                  className={clsx(s.dot, index === selectedIndex && s.activeDot)}
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>
      <div
        className={s.avaUserNameBlock}
        onClick={() => navigateToPublicUserProfile(undefined, p.ownerId)}
      >
        <img alt={'ava'} height={36} src={p.avatarOwner ?? defaultAva} width={36} />
        <Typography variant={'h3'}>{p.userName}</Typography>
      </div>
      <Typography className={s.date} variant={'small'}>
        {' '}
        <ReactTimeAgo date={dateAgo} />
      </Typography>
      <Typography className={s.description} data-showmore={showMore} variant={'regular14'}>
        {p.description ||
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, deleniti? Lorem ipsum dolor sit amet, ' +
            'consectetur adipisicing elit. Alias, cumque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, veritatis.'}
      </Typography>
      <Typography
        as={'span'}
        className={s.showMore}
        onClick={expandDescription}
        variant={'regularLink'}
      >
        {showMore ? 'Hide' : 'Show more'}
      </Typography>
    </li>
  )
}
