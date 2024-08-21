import { useState } from 'react'

import { NextCarousel, PrevCarousel } from '@/assets/icons'
import { useDotButton } from '@/hooks/useDotCarouselButton'
import ModalkaPost from '@/pages/profile/modalkaPost'
import { Post, useGetPostsByUserIdQuery } from '@/services/inctagram.public-posts.service'
import { Button, Typography } from '@chrizzo/ui-kit'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

import s from '@/pages/posts.module.scss'

type Props = {
  navigateToPublicUserProfile: (id: number) => void
  post: Post
}

export const ItemPost = ({ navigateToPublicUserProfile, post: p }: Props) => {
  /**
   * хук из библиотеки карусели
   */
  const [emblaRef, emblaApi] = useEmblaCarousel()
  /**
   * кастомный хук для точек перехода к слайдам карусели
   */
  const { onDotButtonClick, scrollSnaps, selectedIndex } = useDotButton(emblaApi)
  /**
   * стейт раскрытия описания под фото
   */
  const [showMore, setShowMore] = useState(false)

  /**
   * запрос за постами конкретного юзера по Id. Доступно без авторизации
   */
  const { data: postsByUserId, isFetching: isFetchingPosts } = useGetPostsByUserIdQuery({
    endCursorPostId: undefined,
    params: { pageSize: undefined },
    userId: p.ownerId,
  })

  /**
   * раскрыть/скрыть описание под фото
   */
  const expandDescription = () => {
    setShowMore(n => !n)
  }
  /**
   * массив слайдов (модалки постов) карусели
   */
  const modalArrays = postsByUserId?.items.map((item, index, posts) => {
    return (
      <div className={s.emblaSlide} key={item.id}>
        <ModalkaPost index={index} posts={posts} showMore={showMore} />
      </div>
    )
  })

  return (
    <li className={s.post}>
      <div className={s.modalWr}>
        <div className={s.embla} ref={emblaRef}>
          <div className={s.emblaContainer}>{modalArrays}</div>
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
      <div className={s.avaUserNameBlock} onClick={() => navigateToPublicUserProfile(p.ownerId)}>
        <Image alt={'ava'} height={36} src={p.avatarOwner} width={36} />
        <Typography variant={'h3'}>{p.userName}</Typography>
      </div>
      <Typography className={s.date} variant={'small'}>
        {' '}
        {p.createdAt}
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
