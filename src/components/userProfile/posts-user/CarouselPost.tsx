import React from 'react'

import { NextCarousel } from '@/assets/icons/nextCarousel'
import { PrevCarousel } from '@/assets/icons/prevCarousel'
import { PostImagesForCarousel } from '@/components/userProfile/posts-user/PostImagesForCarousel'
import { useDotButton } from '@/hooks/useDotCarousel'
import { Button } from '@chrizzo/ui-kit'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'

import s from '@/components/userProfile/posts-user/posts.module.scss'

type Props = {
  image: string
  showMore: boolean
}
export const CarouselPost = ({ image, showMore }: Props) => {
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

  return (
    <div className={s.postImageContent}>
      <div className={s.embla} ref={emblaRefBig}>
        <div className={s.emblaContainer}>
          <PostImagesForCarousel image={image} showMore={showMore} />
        </div>
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
  )
}
